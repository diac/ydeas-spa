pipeline {
    agent any
    
    stages {
        stage('Git pull') {
            steps {
                git branch: 'main', url: 'https://github.com/diac/ydeas-spa'
            }
        }
        
        stage('Build') {
            steps {
                sh "docker compose build"
            }
        }

        stage('Publish') {
            steps {
                sh "docker compose push"
            }
        }
    }
}