import { defineStore } from "pinia";
import dayjs from 'dayjs';
import $_ from 'lodash';

interface Task {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    createdAt?: string;
    timeLeft?: string;
    id: number;
}

export const useTodoStore = defineStore({
    id: "todo",
    state: () => ({
        tasks: [] as Task[],
        task: {
            name: '',
            description: '',
            startDate: '',
            endDate: '',  
            id: 0,      
        } as Task,
        pageSize: 5
    }),
    actions: {
        create(task: Task) {
            const dateNow = new Date().toISOString();
            let taskId: number;
            do {
                taskId = Math.floor(Math.random() * 1000000);
            } while ($_(this.tasks).some({ 'id': taskId }));

            task.timeLeft = this.computeTimeLeft(task.startDate, task.endDate);
            
            this.tasks.push({
                id: taskId,
                name: task.name,
                description: task.description,
                timeLeft: task.timeLeft,
                startDate: task.startDate,
                endDate: task.endDate,
                createdAt: dateNow,
                
            });

            // Start dynamic time updating
            this.updateTimeLeft();
        },
        updateTask(updatedTask: Task) {
            const index = $_(this.tasks).findIndex({ 'id': updatedTask.id });

            updatedTask.timeLeft = this.computeTimeLeft(updatedTask.startDate, updatedTask.endDate);

            if (index !== -1) {
                this.tasks[index] = updatedTask;
            }

            // Start dynamic time updating
            this.updateTimeLeft();
        },
        deleteTask(id: number) {
            const index = $_(this.tasks).findIndex({ 'id': id });
            if (index !== -1) {
                this.tasks.splice(index, 1);
            }
        },
        sortTasks(sortMode: string) {
            switch (sortMode) {
                case 'nameAsc':
                    this.tasks = $_(this.tasks).sortBy('name').value();
                    break;
                case 'nameDesc':
                    this.tasks = $_(this.tasks).sortBy('name').reverse().value();
                    break;
                case 'dateCreatedAsc':
                    this.tasks = $_(this.tasks).sortBy('createdAt').value();
                    break;
                case 'dateCreatedDesc':
                    this.tasks = $_(this.tasks).sortBy('createdAt').reverse().value();
                    break;
                default:
                    break;
            }
        },
        resetTask() {
            this.task = {
                name: '',
                description: '',
                startDate: '',
                endDate: '',
                id: 0,
            };
        },
        computeTimeLeft(startDate: string, endDate: string): string {
            const end = dayjs(endDate);
            const now = dayjs();
            
            if (end.isBefore(now)) {
                return '- Invalid date range';
            }
        
            const diff = end.diff(now);
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
            return `${days} days, ${hours} hrs, ${minutes} mins, ${seconds} secs`;
        },
        updateTimeLeft() {
            this.tasks.forEach(task => {
                if (task.endDate) {
                    task.timeLeft = this.computeTimeLeft(dayjs().toISOString(), task.endDate);
                }
            });
            setTimeout(() => {
                this.updateTimeLeft();
            }, 1000);
        }
    }
});
