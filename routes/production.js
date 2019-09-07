//Controllers
var productionController = require('../controllers/productionController.js');

//Dependencies
var workersUtil = require('../models/.utils/workerUtil.js');
var domaneAccount = require('../models/.utils/domaneAccount.js');
var companyUtil = require('../models/.utils/company.js');
var teamUtil = require('../models/.utils/teamsUtil.js');
var projectsUtil = require('../models/.utils/projects.js');
var jobUtil = require('../models/.utils/job.js');
var clientUtil = require('../models/.utils/clients.js');
var statusUtil = require('../models/.utils/status.js');
var priorityUtil = require('../models/.utils/priority.js');
var permissionUtil = require('../models/.utils/permission.js');
var agreementUtil = require('../models/.utils/agreementsUtil.js');
var spec = require('../models/.utils/specialization');
var emailsUtil = require('../models/.utils/emails.js');

module.exports = function (app, passport) {

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/signin');
    }

    function isAdmin(req, res, next) {
        if (req.user.IdUprawnienia == 1) {
            return next();
        }
        res.redirect('/noPermission');
    }

    function isHR(req, res, next) {
        if (req.user.IdUprawnienia == 1 || req.user.IdUprawnienia == 2) {
            return next();
        }
        res.redirect('/noPermission');
    }

    app.get('/production', isLoggedIn, productionController.production);
    app.get('/productionAddCompanyFailed', isLoggedIn, productionController.productionAddCompanyFailed);
    app.get('/productionAddCategoryFailed', isLoggedIn, productionController.productionAddCategoryFailed);
    app.get('/addProjectFailed', isLoggedIn, productionController.addProjectFailed);

    app.post('/addProject', isLoggedIn, isHR, function (req, res) {
        var projectName = req.body.projectName;
        var client = req.body.client;
        var category = req.body.category;
        var dateFrom = req.body.dateFrom;
        var dateTo = req.body.dateTo;
        var team = req.body.team;
        var description = req.body.description;

        projectsUtil.addProject(projectName, client, category, dateFrom, dateTo, description, req.user.IdZespol).then(function (idProject) {
            if (!idProject) {
                res.redirect('/addProjectFailed');
            } else {
                teamUtil.teamToProject(idProject, team).then(function () {
                    res.redirect('/production');
                });
            }
        });
    });

    app.post('/deleteProject', isLoggedIn, isHR, function (req, res) {
        var project = req.body.project;

        teamUtil.deleteProjectsTeam(project).then(function () {
            jobUtil.deleteJob(project).then(function () {
                projectsUtil.deleteProject(project).then(function () {
                    res.redirect('/production');
                });
            });
        });
    });

    app.post('/editProject', isLoggedIn, isHR, function (req, res) {
        var project = req.body.projectIdEdit;
        var projectName = req.body.nameEdit;
        var client = req.body.clientEdit;
        var category = req.body.categoryEdit;
        var dateFrom = req.body.dateFromEdit;
        var dateTo = req.body.dateToEdit;
        var team = req.body.teamEdit;
        var description = req.body.descriptionEdit;
        var oldTeamId = req.body.oldTeamId;

        projectsUtil.updateProject(project, projectName, client, category, dateFrom, dateTo, description, team, oldTeamId).then(function () {
            res.redirect('/production');
        });
    });

    app.post('/addingJob', isLoggedIn, function (req, res) {
        var project = req.body.projectIdJob;
        var name = req.body.nameJob;
        var description = req.body.descriptionJob;
        var status = req.body.status;
        var priority = req.body.priority;
        var worker = req.body.workerJob;
        var realizationDate = req.body.realizationDate;

        jobUtil.addJob(project, name, description, status, priority, worker, realizationDate, req.user.IdZespol).then(function () {
            res.redirect('/production');
        });

    });

    app.post('/viewJob', isLoggedIn, function (req, res) {
        var idJob = req.body.jobId;
        var job1 = idJob.replace("\'", "");
        var job2 = job1.replace("\'", "");

        domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
            workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
                companyUtil.getAllCopmany(req.user.IdPracownik).then(function (company) {
                    clientUtil.getAllClients(req.user.IdZespol).then(function (clients) {
                        projectsUtil.getAllProjectCategory(req.user.IdZespol).then(function (category) {
                            teamUtil.getAllTeams(req.user.IdZespol).then(function (teams) {
                                projectsUtil.getAllProjects(req.user.IdZespol).then(function (projects) {
                                    teamUtil.getAllProjectsTeams().then(function (teamProjects) {
                                        statusUtil.getAllStatus().then(function (statuses) {
                                            priorityUtil.getAllPriority().then(function (priority) {
                                                workersUtil.getWorkers(req.user.IdZespol).then(function (workers) {
                                                    jobUtil.getAllJob(req.user.IdZespol).then(function (jobs) {
                                                        jobUtil.getOneJob(job2).then(function (job) {
                                                            permissionUtil.getPermission(req.user.IdPracownik).then(function (permission) {
                                                                res.render('production', {
                                                                    name: profile.Imie,
                                                                    site: "Zasoby ludzkie",
                                                                    company: company,
                                                                    clients: clients,
                                                                    category: category,
                                                                    teams: teams,
                                                                    projects: projects,
                                                                    teamProjects: teamProjects,
                                                                    statuses: statuses,
                                                                    priority: priority,
                                                                    workers: workers,
                                                                    jobs: jobs,
                                                                    job: job,
                                                                    permission: permission,
                                                                    jobView: 1,
                                                                    addCompanyFailed: 0,
                                                                    addCategoryFailed: 0,
                                                                    addProjectFailed: 0,
                                                                    addClientFailed: 0
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    app.post('/deleteJob', isLoggedIn, function (req, res) {
        var jobId = req.body.jobIdShow;

        jobUtil.deleteJobJob(jobId).then(function () {
            res.redirect("/production");
        });
    });

    app.post('/editJob', isLoggedIn, function (req, res) {
        var name = req.body.jobEditName;
        var priority = req.body.jobEditPriority;
        var status = req.body.jobEditStatus;
        var description = req.body.jobEditDescription;
        var realizationDate = req.body.jobEditDate;
        var worker = req.body.jobEditWorker;
        var jobId = req.body.jobEditId;

        jobUtil.editJob(jobId, name, priority, status, description, realizationDate, worker).then(function () {
            domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
                workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
                    companyUtil.getAllCopmany(req.user.IdPracownik).then(function (company) {
                        clientUtil.getAllClients(req.user.IdZespol).then(function (clients) {
                            projectsUtil.getAllProjectCategory(req.user.IdZespol).then(function (category) {
                                teamUtil.getAllTeams(req.user.IdZespol).then(function (teams) {
                                    projectsUtil.getAllProjects(req.user.IdZespol).then(function (projects) {
                                        teamUtil.getAllProjectsTeams().then(function (teamProjects) {
                                            statusUtil.getAllStatus().then(function (statuses) {
                                                priorityUtil.getAllPriority().then(function (priority) {
                                                    workersUtil.getWorkers(req.user.IdZespol).then(function (workers) {
                                                        jobUtil.getAllJob(req.user.IdZespol).then(function (jobs) {
                                                            jobUtil.getOneJob(jobId).then(function (job) {
                                                                permissionUtil.getPermission(req.user.IdPracownik).then(function (permission) {
                                                                    res.render('production', {
                                                                        name: profile.Imie,
                                                                        site: "Zasoby ludzkie",
                                                                        company: company,
                                                                        clients: clients,
                                                                        category: category,
                                                                        teams: teams,
                                                                        projects: projects,
                                                                        teamProjects: teamProjects,
                                                                        statuses: statuses,
                                                                        priority: priority,
                                                                        workers: workers,
                                                                        jobs: jobs,
                                                                        job: job,
                                                                        permission: permission,
                                                                        jobView: 1,
                                                                        addCompanyFailed: 0,
                                                                        addCategoryFailed: 0,
                                                                        addProjectFailed: 0,
                                                                        addClientFailed: 0
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    app.post('/jobDone', isLoggedIn, function (req, res) {
        var jobId = req.body.jobIdShow;

        jobUtil.jobDone(jobId).then(function () {
            setTimeout(function () {
                res.redirect('/production');
            }, 2000);
        });
    });

    app.post('/addCategory', isLoggedIn, isHR, function (req, res) {
        var categoryName = req.body.nameCategory;

        projectsUtil.addCategory(categoryName, req.user.IdZespol).then(function (ok) {
            if (!ok) {
                res.redirect('/productionAddCategoryFailed');
            } else {
                res.redirect('/production');
            }
        });
    });
};