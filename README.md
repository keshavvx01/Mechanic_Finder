# 🚗 Mechanic Finder

A full-stack roadside assistance platform that helps users quickly locate nearby mechanics and request emergency vehicle assistance.

## Live Demo

**Application:** http://3.111.47.86

## GitHub Repository

https://github.com/keshavvx01/Mechanic_Finder

---

## Features

- Find nearby mechanics
- Mechanic registration
- Roadside assistance requests
- Responsive React frontend
- Express.js REST API
- Dockerized deployment
- Nginx Reverse Proxy
- AWS EC2 Hosting
- GitHub Actions CI/CD
- Terraform Infrastructure as Code
- Prometheus Monitoring
- Node Exporter Metrics

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Leaflet Maps

### Backend
- Node.js
- Express.js

### DevOps
- Docker
- Docker Compose
- AWS EC2
- Nginx
- GitHub Actions
- Terraform
- Amazon S3 (Terraform Backend)
- DynamoDB (Terraform State Locking)
- Prometheus
- Node Exporter

---

## Project Architecture

```
                    GitHub
                       │
                       ▼
              GitHub Actions CI/CD
                       │
                       ▼
                 Docker Image Build
                       │
                       ▼
                 AWS EC2 (Mumbai)
                       │
             Nginx Reverse Proxy
                       │
             Mechanic Finder App
                       │
      ┌────────────────┴──────────────┐
      │                               │
Node Exporter (:9100)      Prometheus (:9090)
```

---

## Infrastructure

- AWS EC2 (Mumbai Region)
- Docker Container
- Nginx Reverse Proxy
- Terraform Infrastructure
- Remote Terraform State using Amazon S3
- Terraform State Locking using DynamoDB

---

## Deployment

```bash
git clone https://github.com/keshavvx01/Mechanic_Finder.git

cd Mechanic_Finder

docker-compose up -d
```

---

## Terraform

```bash
cd terraform

terraform init

terraform plan

terraform apply
```

---

## Monitoring

Prometheus collects infrastructure metrics from Node Exporter.

Services monitored:

- CPU Usage
- Memory Usage
- Disk Usage
- Network Statistics
- Filesystem Usage

---

## Project Status

- Full Stack Application
- Production Deployment
- CI/CD Pipeline
- Infrastructure as Code
- Monitoring Enabled

---

## Author

**Keshav**

B.Tech CSE (AI)

DevOps & Cloud Enthusiast
