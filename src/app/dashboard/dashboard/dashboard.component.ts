import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { TasksModel } from '../../models/task.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // Bar Chart
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Tasks by Category',
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  };
  barChartType: 'bar' = 'bar';
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  // Pie Chart
  pieChartData: ChartData<'pie'> = {
    labels: ['completed', 'inProgress', 'not_started'],
    datasets: [
      {
        data: [],
        backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
      },
    ],
  };
  pieChartType: 'pie' = 'pie';

  // Task Statistics
  taskStats = {
    total: 0,
    completed: 0,
    inProgress: 0,
    not_started: 0,
    completedPercentage: 0,
    notCompletedPercentage: 0,
    overdueCount: 0,
  };

  constructor(private readonly taskService: TaskService) {}

  ngOnInit(): void {
    const tasks = this.taskService.getTasks();
    this.prepareBarChartData(tasks);
    this.preparePieChartData(tasks);
    this.prepareTaskStats(tasks);
  }

  prepareBarChartData(tasks: TasksModel[]): void {
    const taskCountByCategory = tasks.reduce(
      (acc: { [key: string]: number }, task: TasksModel) => {
        const categoryName = task.category?.name ?? 'No Category';
        acc[categoryName] = (acc[categoryName] || 0) + 1;
        return acc;
      },
      {}
    );

    const categories = Object.keys(taskCountByCategory);
    const colors = categories.map((_, index) => this.generateColor(index));

    this.barChartData = {
      labels: categories,
      datasets: [
        {
          data: Object.values(taskCountByCategory),
          label: 'Tasks by Category',
          backgroundColor: colors, // Assign dynamic colors
          borderColor: colors.map((color) => this.darkenColor(color, 0.2)), // Optional darker borders
          borderWidth: 1,
        },
      ],
    };

    if (this.chart) {
      this.chart.update();
    }
  }

  preparePieChartData(tasks: TasksModel[]): void {
    const taskStatusCounts = {
      completed: 0,
      inProgress: 0,
      not_started: 0,
    };

    const statusKeyMap: { [key: string]: keyof typeof taskStatusCounts } = {
      completed: 'completed',
      'in-progress': 'inProgress',
      'not-started': 'not_started',
    };

    tasks.forEach((task) => {
      const status = task.status || 'not-started';
      const mappedKey = statusKeyMap[status];
      if (mappedKey) {
        taskStatusCounts[mappedKey]++;
      }
    });

    this.pieChartData = {
      labels: Object.keys(taskStatusCounts),
      datasets: [
        {
          data: Object.values(taskStatusCounts),
          backgroundColor: ['#4ade80', '#facc15', '#f87171'],
        },
      ],
    };

    if (this.chart) {
      this.chart.update();
    }
  }

  prepareTaskStats(tasks: TasksModel[]): void {
    const now = new Date();
    this.taskStats.total = tasks.length;
    this.taskStats.completed = tasks.filter(
      (t) => t.status === 'completed'
    ).length;
    this.taskStats.inProgress = tasks.filter(
      (t) => t.status === 'in-progress'
    ).length;
    this.taskStats.not_started = tasks.filter(
      (t) => t.status === 'not-started'
    ).length;

    // Calculate overdue tasks
    this.taskStats.overdueCount = tasks.filter(
      (task) =>
        new Date(task.dueDate).getTime() < now.getTime() &&
        task.status !== 'completed'
    ).length;

    // Calculate percentages
    if (this.taskStats.total > 0) {
      this.taskStats.completedPercentage =
        (this.taskStats.completed / this.taskStats.total) * 100;
      this.taskStats.notCompletedPercentage =
        100 - this.taskStats.completedPercentage;
    }
  }

  hasData(): boolean {
    return (
      Array.isArray(this.barChartData.labels) &&
      this.barChartData.labels.length > 0 &&
      Array.isArray(this.barChartData.datasets) &&
      this.barChartData.datasets.length > 0 &&
      Array.isArray(this.barChartData.datasets[0].data) &&
      this.barChartData.datasets[0].data.length > 0
    );
  }

  // Generate a color based on the index
  private generateColor(index: number): string {
    const colors = [
      ' #f9a8d4',
      ' #fdba74',
      ' #5eead4',
      ' #17a2b8', 
      ' #6610f2',
    ];
    return colors[index % colors.length];
  }

  // Optional: Darken a color
  private darkenColor(color: string, amount: number): string {
    const usePound = color[0] === '#';
    let num = parseInt(color.slice(1), 16);
    let r = (num >> 16) - amount * 255;
    let g = ((num >> 8) & 0x00ff) - amount * 255;
    let b = (num & 0x0000ff) - amount * 255;

    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));

    return (
      (usePound ? '#' : '') +
      ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
    );
  }
}
