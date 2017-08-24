node ('nodejs')

 {
    def array = env.JOB_NAME.split("/")
    def pipelineName = array[array.length - 2];

    stage('Checkout') {
        checkout scm
        if (env.BRANCH_NAME != "master"){
           sh "git checkout master"
           sh "git branch tmp_${env.BRANCH_NAME}"
           sh "git checkout tmp_${env.BRANCH_NAME}"
           sh "git merge master"
        }
    }
    stage('Install Dep') {
        sh "npm install"
    }
    stage('Analize Code') {
        sh "npm run lint"
    }
    stage('Build') {
        sh "npm run build"
    }
    stage('Tests') {
        sh "npm run test:pre-deploy"
        step([$class: 'XUnitBuilder',
                        thresholds: [[$class: 'FailedThreshold', unstableThreshold: '1']],
                        tools: [[$class: 'JUnitType', pattern: 'test-report/test-pre-deploy-report.xml']]])
    }
    stage('Clean'){
        if (env.BRANCH_NAME != "master"){
            sh "git checkout ${env.BRANCH_NAME}"
            sh "git branch -D tmp_${env.BRANCH_NAME}"
        }
    }

    if (env.BRANCH_NAME != 'master') {
        properties([pipelineTriggers([upstream(threshold: hudson.model.Result.SUCCESS, upstreamProjects: "${pipelineName}/master")])])
    }
    print "prova master"
}