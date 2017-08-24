node ('nodejs')

 {
    print "${env.BRANCH_NAME}"
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
        step([$class: 'XUnitBuilder',
                        thresholds: [[$class: 'FailedThreshold', unstableThreshold: '1']],
                        tools: [[$class: 'JUnitType', pattern: 'test-report/test-pre-deploy-report.xml']]])
    }
}