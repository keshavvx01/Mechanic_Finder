# 🚗 Mechanic Finder

A production-style full-stack roadside assistance platform that helps users quickly locate nearby mechanics and request emergency vehicle assistance.

The project demonstrates modern full-stack development, cloud deployment, reverse proxy configuration, infrastructure monitoring, and observability using AWS and Prometheus.

---

## 🌐 Live Demo

**Application:**  
http://51.20.171.255/

---

## 📂 GitHub Repository

https://github.com/keshavvx01/Mechanic_Finder

---

# ✨ Features

- 🔍 Find nearby mechanics
- 🛠️ Mechanic registration
- 🚨 Roadside assistance requests
- 📍 Interactive map integration
- 📱 Responsive React frontend
- ⚡ Express.js REST API
- 🐳 Dockerized deployment
- 🌐 Nginx Reverse Proxy
- ☁️ AWS EC2 deployment
- ❤️ Health Check endpoint
- 📊 Infrastructure Monitoring
- 📈 Live Metrics Dashboard

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Leaflet Maps

## Backend

- Node.js
- Express.js

## DevOps & Cloud

- Docker
- Docker Compose
- AWS EC2
- Nginx
- Prometheus
- Node Exporter
- Grafana
- Amazon CloudWatch
- Amazon SNS
- Terraform (Remote State Backend)

---

# 🏗 System Architecture

```text
                    Internet
                        │
                        ▼
          Application Load Balancer
                        │
                        ▼
                 AWS EC2 (Ubuntu)
        ┌───────────────────────────────┐
        │        Nginx                  │
        │                               │
        │  React Frontend               │
        │  Express Backend              │
        │                               │
        │  Node Exporter                │
        │  Prometheus                   │
        │  Grafana                      │
        └───────────────────────────────┘
```

---

# 📊 Monitoring Architecture

```text
            Node Exporter
                  │
                  ▼
             Prometheus
                  │
                  ▼
               Grafana

                     +

             AWS CloudWatch
                    │
                    ▼
             CloudWatch Alarm
                    │
                    ▼
                Amazon SNS
```

---

# ☁ AWS Services Used

- Amazon EC2
- Application Load Balancer
- Target Group
- Security Groups
- Amazon CloudWatch
- CloudWatch Alarms
- Amazon SNS
- IAM
- Amazon S3 (Terraform Remote State)
- DynamoDB (Terraform State Locking)

---

# 📈 Monitoring & Observability

Infrastructure monitoring is implemented using **Prometheus**, **Node Exporter**, and **Grafana**.

### Metrics Collected

- CPU Utilization
- Memory Usage
- Disk Usage
- Filesystem Usage
- Network Traffic
- Load Average
- System Uptime

AWS CloudWatch is used for infrastructure monitoring, while Amazon SNS provides email notifications for CloudWatch alarms.

---

# 🚀 Deployment

Clone the repository

```bash
git clone https://github.com/keshavvx01/Mechanic_Finder.git

cd Mechanic_Finder
```

Run using Docker

```bash
docker-compose up -d
```

---

# ⚙ Terraform

Terraform is configured with a **remote backend** for state management.

```bash
cd terraform

terraform init

terraform plan

terraform apply
```

Remote backend:

- Amazon S3
- DynamoDB State Locking

---

# 📂 Project Structure

```
Mechanic_Finder/
│
├── frontend/
├── backend/
├── nginx/
├── terraform/
├── docker-compose.yml
├── README.md
└── .github/
```

---

# 📷 Screenshots

- Application Homepage
- AWS EC2
- Application Load Balancer
- CloudWatch Dashboard
- Grafana Dashboard
- Prometheus Targets

---

# 🚀 Future Improvements

- HTTPS using SSL/TLS
- Kubernetes Deployment
- Auto Scaling
- CI/CD Deployment Automation
- Application Metrics using Prometheus
- Centralized Logging

---

# 📄 Project Status

- ✅ Full Stack Application
- ✅ Production Deployment
- ✅ Dockerized
- ✅ AWS Hosted
- ✅ Reverse Proxy Configured
- ✅ Monitoring Enabled
- ✅ Observability Dashboard
- ✅ Cloud Monitoring

---

# 👨‍💻 Author

**Keshav**

B.Tech CSE (AI)

DevOps • Cloud Computing • Full Stack Development
