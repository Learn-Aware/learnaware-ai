pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'docker-credentials' 
        DOCKER_REGISTRY = 'birfbkdstsbhbk'   // docker.io or your private registry
        DOCKER_REPO = 'learnawareai'       // DockerHub username or organization
        COMPOSE_PROJECT_NAME = 'learnaware-ai'     // Name for the Docker Compose project
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh 'docker-compose build'
                }
            }
        }

        stage('Push Images to Registry') {
            steps {
                script {
                    docker.withRegistry("https://${DOCKER_REGISTRY}", DOCKER_CREDENTIALS_ID) {
                        sh 'docker-compose push'
                    }
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    sh 'docker-compose down'   
                    sh 'docker-compose up -d'  
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up Docker resources...'
            sh 'docker system prune -f'  
        }
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed. Please check the logs.'
        }
    }
}
