import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { calculateDistanceKm } from '../utils/geo.js';
import { createHttpError, toNumber } from '../utils/validation.js';
import { readJsonFile, writeJsonFile } from './file-store.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mechanicsFilePath = path.resolve(__dirname, '../../data/mechanics.json');

export async function listMechanics(filters) {
  const mechanics = await readJsonFile(mechanicsFilePath, []);
  const lat = toNumber(filters.lat);
  const lng = toNumber(filters.lng);
  const distanceKm = toNumber(filters.distanceKm) ?? 10;
  const maxBudget = toNumber(filters.maxBudget) ?? Number.MAX_SAFE_INTEGER;
  const hasLiveCoords = Number.isFinite(lat) && Number.isFinite(lng);

  const data = mechanics
    .map((mechanic) => {
      const liveDistance = hasLiveCoords
        ? calculateDistanceKm({ lat, lng }, mechanic.coords)
        : mechanic.seedDistanceKm ?? null;

      return {
        ...mechanic,
        distanceKm: liveDistance,
      };
    })
    .filter(
      (mechanic) =>
        mechanic.basePrice <= maxBudget &&
        (mechanic.distanceKm === null || mechanic.distanceKm <= distanceKm),
    )
    .sort((left, right) => {
      const distanceA = left.distanceKm ?? Number.MAX_SAFE_INTEGER;
      const distanceB = right.distanceKm ?? Number.MAX_SAFE_INTEGER;
      return distanceA - distanceB || left.basePrice - right.basePrice;
    });

  return {
    data,
    meta: {
      count: data.length,
      filters: {
        distanceKm,
        maxBudget,
      },
      liveLocation: hasLiveCoords,
    },
  };
}

export async function registerMechanic(payload) {
  const mechanics = await readJsonFile(mechanicsFilePath, []);

  const mechanic = {
    id: randomUUID(),
    name: requireString(payload.name, 'Mechanic name is required.'),
    phone: requireString(payload.phone, 'Phone number is required.'),
    speciality: requireString(payload.speciality, 'Speciality is required.'),
    basePrice: requirePositiveNumber(payload.basePrice, 'Base price must be a valid number.'),
    pricing: {
      visit: requirePositiveNumber(payload.pricing?.visit, 'Visit fee must be a valid number.'),
      labor: requirePositiveNumber(payload.pricing?.labor, 'Labor fee must be a valid number.'),
      tow: requirePositiveNumber(payload.pricing?.tow, 'Tow fee must be a valid number.'),
    },
    whyAffordable: requireString(
      payload.whyAffordable,
      'Please explain why the listing is low cost.',
    ),
    coords: requireCoords(payload.coords),
    seedDistanceKm: 0,
    verified: true,
    createdAt: new Date().toISOString(),
  };

  mechanics.push(mechanic);
  await writeJsonFile(mechanicsFilePath, mechanics);

  return mechanic;
}

function requireString(value, message) {
  if (typeof value !== 'string' || !value.trim()) {
    throw createHttpError(400, message);
  }

  return value.trim();
}

function requirePositiveNumber(value, message) {
  const parsed = toNumber(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw createHttpError(400, message);
  }

  return parsed;
}

function requireCoords(coords) {
  const lat = toNumber(coords?.lat);
  const lng = toNumber(coords?.lng);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    throw createHttpError(400, 'Valid latitude and longitude are required.');
  }

  return { lat, lng };
}
