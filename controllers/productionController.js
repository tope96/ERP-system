var workersUtil = require('../models/.utils/workerUtil.js');
var domaneAccount = require('../models/.utils/domaneAccount.js');
var projectsUtil = require('../models/.utils/projects.js');
var companyUtil = require('../models/.utils/company.js');
var clientUtil = require('../models/.utils/clients.js');
var teamUtil = require('../models/.utils/teamsUtil.js');
var statusUtil = require('../models/.utils/status.js');
var priorityUtil = require('../models/.utils/priority.js');
var jobUtil = require('../models/.utils/job.js');
var permissionUtil = require('../models/.utils/permission.js');


exports.production = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
            companyUtil.getAllCopmany(req.user.IdZespol).then(function (company) {
                clientUtil.getAllClients(req.user.IdZespol).then(function (clients) {
                    projectsUtil.getAllProjectCategory(req.user.IdZespol).then(function (category) {
                        teamUtil.getAllTeams(req.user.IdZespol).then(function (teams) {
                            projectsUtil.getAllProjects(req.user.IdZespol).then(function (projects) {
                                teamUtil.getAllProjectsTeams().then(function (teamProjects) {
                                    statusUtil.getAllStatus().then(function (statuses) {
                                        priorityUtil.getAllPriority().then(function (priority) {
                                            workersUtil.getWorkers(req.user.IdZespol).then(function (workers) {
                                                jobUtil.getAllJob(req.user.IdZespol).then(function (jobs) {
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
                                                            permission: permission,
                                                            jobView: 0,
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
};

exports.productionAddCompanyFailed = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
            companyUtil.getAllCopmany(req.user.IdZespol).then(function (company) {
                clientUtil.getAllClients(req.user.IdZespol).then(function (clients) {
                    projectsUtil.getAllProjectCategory(req.user.IdZespol).then(function (category) {
                        teamUtil.getAllTeams(req.user.IdZespol).then(function (teams) {
                            projectsUtil.getAllProjects(req.user.IdZespol).then(function (projects) {
                                teamUtil.getAllProjectsTeams().then(function (teamProjects) {
                                    statusUtil.getAllStatus().then(function (statuses) {
                                        priorityUtil.getAllPriority().then(function (priority) {
                                            workersUtil.getWorkers(req.user.IdZespol).then(function (workers) {
                                                jobUtil.getAllJob(req.user.IdZespol).then(function (jobs) {
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
                                                            permission: permission,
                                                            jobView: 0,
                                                            addCompanyFailed: "Dodawanie firmy się nie powiodło. Taka firma już istnieje w bazie.",
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
};

exports.productionAddCategoryFailed = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
            companyUtil.getAllCopmany(req.user.IdZespol).then(function (company) {
                clientUtil.getAllClients(req.user.IdZespol).then(function (clients) {
                    projectsUtil.getAllProjectCategory(req.user.IdZespol).then(function (category) {
                        teamUtil.getAllTeams(req.user.IdZespol).then(function (teams) {
                            projectsUtil.getAllProjects(req.user.IdZespol).then(function (projects) {
                                teamUtil.getAllProjectsTeams().then(function (teamProjects) {
                                    statusUtil.getAllStatus().then(function (statuses) {
                                        priorityUtil.getAllPriority().then(function (priority) {
                                            workersUtil.getWorkers(req.user.IdZespol).then(function (workers) {
                                                jobUtil.getAllJob(req.user.IdZespol).then(function (jobs) {
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
                                                            permission: permission,
                                                            jobView: 0,
                                                            addCompanyFailed: 0,
                                                            addCategoryFailed: "Dodawanie kategorii nie powiodło się, ponieważ w bazie znajduje się już taka kategoria. Podaj inną nazwę.",
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
};

exports.addProjectFailed = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
            companyUtil.getAllCopmany(req.user.IdZespol).then(function (company) {
                clientUtil.getAllClients(req.user.IdZespol).then(function (clients) {
                    projectsUtil.getAllProjectCategory(req.user.IdZespol).then(function (category) {
                        teamUtil.getAllTeams(req.user.IdZespol).then(function (teams) {
                            projectsUtil.getAllProjects(req.user.IdZespol).then(function (projects) {
                                teamUtil.getAllProjectsTeams().then(function (teamProjects) {
                                    statusUtil.getAllStatus().then(function (statuses) {
                                        priorityUtil.getAllPriority().then(function (priority) {
                                            workersUtil.getWorkers(req.user.IdZespol).then(function (workers) {
                                                jobUtil.getAllJob(req.user.IdZespol).then(function (jobs) {
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
                                                            permission: permission,
                                                            jobView: 0,
                                                            addCompanyFailed: 0,
                                                            addCategoryFailed: 0,
                                                            addProjectFailed: "Dodawanie projektu nie powiodło się, ponieważ istnieje już projekt o takiej nazwie. Podaj inną nazwę.",
                                                            addClientFailed: 0
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                })
                            });
                        });
                    });
                });
            });
        });
    });
};

exports.addClientFailed = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
            companyUtil.getAllCopmany(req.user.IdZespol).then(function (company) {
                clientUtil.getAllClients(req.user.IdZespol).then(function (clients) {
                    projectsUtil.getAllProjectCategory(req.user.IdZespol).then(function (category) {
                        teamUtil.getAllTeams(req.user.IdZespol).then(function (teams) {
                            projectsUtil.getAllProjects(req.user.IdZespol).then(function (projects) {
                                teamUtil.getAllProjectsTeams().then(function (teamProjects) {
                                    statusUtil.getAllStatus().then(function (statuses) {
                                        priorityUtil.getAllPriority().then(function (priority) {
                                            workersUtil.getWorkers(req.user.IdZespol).then(function (workers) {
                                                jobUtil.getAllJob(req.user.IdZespol).then(function (jobs) {
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
                                                            permission: permission,
                                                            jobView: 0,
                                                            addCompanyFailed: 0,
                                                            addCategoryFailed: 0,
                                                            addProjectFailed: 0,
                                                            addClientFailed: "Dodawanie klienta nie powiodło się, ponieważ istnieje już klient o takich danych. Podaj inne dane."
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                })
                            });
                        });
                    });
                });
            });
        });
    });
};