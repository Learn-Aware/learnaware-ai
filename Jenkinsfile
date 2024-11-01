pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'docker-credentials'          // ID of Docker credentials in Jenkins
        DOCKER_REGISTRY = 'birfbkdstsbhbk'                    // Docker registry (e.g., Docker Hub username)
        DOCKER_REPO = 'learnawareai'                          // Repository name
    }

    stages {
        stage('SCM Checkout') {
            steps {
                retry(3) {
                    git branch: 'develop', url: 'https://github.com/Learn-Aware/learnaware-ai.git'
                }
            }
        }

        stage('Build Docker Images with Docker Compose') {
            steps {
                script {
                    sh 'docker-compose build'
                }
            }
        }

        stage('Login to Docker Registry') {
            steps {
                withCredentials([string(credentialsId: DOCKER_CREDENTIALS_ID, variable: 'dockercredentials')]) {
                    script {
                        sh "echo '${dockercredentials}' | docker login -u ${DOCKER_REGISTRY} --password-stdin"
                    }
                }
            }
        }

        stage('Push Docker Images to Registry') {
            steps {
                script {
                    sh 'docker-compose push'
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout'
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed. Please check the logs.'
        }
    }
}
