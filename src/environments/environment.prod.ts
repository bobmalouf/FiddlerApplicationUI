export const environment = {
  production: true,
  apiConfig: {
    restURI: "/api",
    serviceEndpoints: {
      projectService: {
        getProject: "/project",
        getProjects: "/project",
        createProject: "/project"
      },
      verifyService: {
        verifyJSON: "/verify"
      },
      teamService: {
        getTeam: "/team",
        getTeams: "/team",
        createTeam: "/team"
      },
      peopleService: {
        getPeople: "/person",
        getPerson: "/person",
        createPerson: "/person"
      },
    }
  }
};
