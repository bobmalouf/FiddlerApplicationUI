import { Process } from './process';

export class Project {

    projectId: string;
    projectType: string;
    projectName: string;
    projectStatus: string;
    processes: Process[] = [];
    created: Date;
}
