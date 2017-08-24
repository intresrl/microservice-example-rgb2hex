node ('nodejs')

 {
    stages {
        stage('Checkout') {
            checkout scm
        }
        stage('Install Dep') {
            sh 'npm install'
        }
        stage('Analize Code') {
            sh 'npm run lint'
        }
        stage('Build') {
            sh 'npm run build'
        }
        stage('Tests') {
            sh 'npm run test:pre-deploy'
        }
    }
}