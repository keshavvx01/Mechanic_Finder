import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { calculateDistanceKm } from '../utils/geo.js';
import { createHttpError, toNumber } from '../utils/validation.js';
import { readJsonFile, writeJsonFile } from './file-store.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const requestsFilePath = path.resolve(__dirname, '../../data/requests.json');
const mechanicsFilePath = path.resolve(__dirname, '../../data/mechanics.json');

export async function listAssistanceRequests() {
  const requests = await readJsonFile(requestsFilePath, []);
  return requests.sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

export async function getAssistanceRequest(id) {
  const requests = await readJsonFile(requestsFilePath, []);
  const assistanceRequest = requests.find((item) => item.id === id);

  if (!assistanceRequest) {
    throw createHttpError(404, 'Assistance request not found.');
  }

  return assistanceRequest;
}

export async function createAssistanceRequest(payload) {
  const [requests, mechanics] = await Promise.all([
    readJsonFile(requestsFilePath, []),
    readJsonFile(mechanicsFilePath, []),
  ]);

  const mechanic = mechanics.find((item) => item.id === payload.mechanicId);
  if (!mechanic) {
    throw createHttpError(404, 'Selected mechanic not found.');
  }

  const userLocation = requireCoords(payload.userLocation);
  const distanceKm = calculateDistanceKm(userLocation, mechanic.coords);
  const estimatedArrivalMinutes = Math.max(10, Math.min(45, Math.round(distanceKm * 8 + 10)));

  const assistanceRequest = {
    id: randomUUID(),
    requestNumber: `PSP-${Date.now().toString().slice(-6)}`,
    mechanicId: mechanic.id,
    mechanicSnapshot: {
      id: mechanic.id,
      name: mechanic.name,
      phone: mechanic.phone,
      basePrice: mechanic.basePrice,
    },
    customer: {
      name: requireString(payload.customerName, 'Customer name is required.'),
      phone: requireString(payload.phone, 'Customer phone is required.'),
    },
    issue: requireString(payload.issue, 'Issue type is required.'),
    notes: typeof payload.notes === 'string' ? payload.notes.trim() : '',
    userLocation,
    distanceKm: Number(distanceKm.toFixed(2)),
    estimatedArrivalMinutes,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  requests.push(assistanceRequest);
  await writeJsonFile(requestsFilePath, requests);

  return assistanceRequest;
}

export async function updateAssistanceRequestStatus(id, status) {
  const requests = await readJsonFile(requestsFilePath, []);
  const index = requests.findIndex((item) => item.id === id);

  if (index === -1) {
    throw createHttpError(404, 'Assistance request not found.');
  }

  const nextStatus = requireString(status, 'A valid status is required.');

  requests[index] = {
    ...requests[index],
    status: nextStatus,
    updatedAt: new Date().toISOString(),
  };

  await writeJsonFile(requestsFilePath, requests);
  return requests[index];
}

function requireString(value, message) {
  if (typeof value !== 'string' || !value.trim()) {
    throw createHttpError(400, message);
  }

  return value.trim();
}

function requireCoords(coords) {
  const lat = toNumber(coords?.lat);
  const lng = toNumber(coords?.lng);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    throw createHttpError(400, 'A valid user location is required.');
  }

  return { lat, lng };
}
