/*
 * This color converter software is part of a micro-service architecture written for demonstration purposes.
 * Copyright (C)  2017  Gianni Bombelli @ Intré S.r.l.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

node('schiavo') {

    env.NODEJS_HOME = "${tool 'nodejs-8'}"
    env.DOCKER_HOME = "${tool 'docker-latest'}"
    env.PATH="${env.NODEJS_HOME}/bin:${env.DOCKER_HOME}/bin:${env.PATH}"
    env.ANSIBLE_HOST_KEY_CHECKING = 'false'

    def test_port = 3000 + env.BUILD_ID.toInteger()

    def array = env.JOB_NAME.split("/")
    def pipelineName = array[array.length - 2];

    try {
        stage('Checkout'){
            checkout scm
            if (env.BRANCH_NAME != 'master') {
                print "Checkout branch : ${env.BRANCH_NAME} and merge to master"
                sh "git checkout master"
                print "Pull last commits"
                sh "git pull"
                print "Create new branch : master-${env.BRANCH_NAME}"
                sh "git branch master-${env.BRANCH_NAME}"
                print "Checkout branch : master-${env.BRANCH_NAME}"
                sh "git checkout master-${env.BRANCH_NAME}"
                print "Merging feature branch : ${env.BRANCH_NAME}"
                sh "git merge --no-commit origin/${env.BRANCH_NAME}"

                properties([pipelineTriggers([upstream(threshold: hudson.model.Result.SUCCESS, upstreamProjects: "${pipelineName}/master")])])
            }
        }

        stage('Install Dependencies'){
            sh "npm install"
        }

        stage('Static Code Analisys'){
            sh "npm run lint"
        }

        stage('Build'){
            sh "npm run build"
        }

        stage('Test Pre Deploy'){
            sh "npm run test:pre-deploy"

            step([$class: 'XUnitBuilder',
                thresholds: [[$class: 'FailedThreshold', unstableThreshold: '1']],
                tools: [[$class: 'JUnitType', pattern: 'test-report/test-pre-deploy-report.xml']]])
        }

        stage('Build Docker Image') {
            sh "docker -H tcp://192.168.50.91:2375 build -t 192.168.50.91:5000/${pipelineName}-${env.BRANCH_NAME}:${env.BUILD_ID} -t 192.168.50.91:5000/${pipelineName}-${env.BRANCH_NAME}:latest ."
        }

        stage('Push to Docker Resgistry') {
            sh "docker -H tcp://192.168.50.91:2375 push 192.168.50.91:5000/${pipelineName}-${env.BRANCH_NAME}:${env.BUILD_ID}"
            sh "docker -H tcp://192.168.50.91:2375 push 192.168.50.91:5000/${pipelineName}-${env.BRANCH_NAME}:latest"
        }

        stage ('Deploy and Run') {
            if (env.BRANCH_NAME == 'master') {
                print "Deploy docker container to : staging environmet"
                sh "ansible-playbook -i /ansible/inventory/hosts.yml /ansible/rgb2hex.yml --limit staging"
            } else {
                print "Deploy docker container to : testing environmet"
                sh "ansible-playbook -i /ansible/inventory/hosts.yml --extra-vars 'rgb2hex_branch=${env.BRANCH_NAME} rgb2hex_port=${test_port}' /ansible/rgb2hex.yml --limit testing"
            }
        }

        stage('Test post-deploy') {
            def test_url = ''
            if (env.BRANCH_NAME == 'master') {
                test_url = 'http://192.168.50.93:3100'
            } else {
                test_url = 'http://192.168.50.92:' + test_port
            }
            sh "npm run test:post-deploy -- --test_url=${test_url}"

            step([$class: 'XUnitBuilder',
                thresholds: [[$class: 'FailedThreshold', unstableThreshold: '1']],
                tools: [[$class: 'JUnitType', pattern: 'test-report/test-post-deploy-report.xml']]])
        }

        stage('Cleanup') {
            if (env.BRANCH_NAME != 'master') {
                sh "git checkout master"
                sh "git branch -D master-${env.BRANCH_NAME}"
            }

            sh "rm node_modules -rf"

            sh "docker -H tcp://192.168.50.91:2375 rmi 192.168.50.91:5000/${pipelineName}-${env.BRANCH_NAME}:${env.BUILD_ID}"
            sh "docker -H tcp://192.168.50.91:2375 rmi 192.168.50.91:5000/${pipelineName}-${env.BRANCH_NAME}:latest"

        }

    } catch (err){
        if (env.BRANCH_NAME != 'master') {
            sh "git checkout master"
            sh "git branch -D master-${env.BRANCH_NAME}"
        }

        sh "rm node_modules -rf"

        sh "docker -H tcp://192.168.50.91:2375 rmi 192.168.50.91:5000/${pipelineName}-${env.BRANCH_NAME}:${env.BUILD_ID}"
        sh "docker -H tcp://192.168.50.91:2375 rmi 192.168.50.91:5000/${pipelineName}-${env.BRANCH_NAME}:latest"

        throw err
    }
}
