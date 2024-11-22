import { PrismaClient, TaskStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const taskTitles = [
        'Tarefa 1', 'Tarefa 2', 'Tarefa 3', 'Tarefa 4', 'Tarefa 5',
        'Tarefa 6', 'Tarefa 7', 'Tarefa 8', 'Tarefa 9', 'Tarefa 10',
        'Tarefa 11', 'Tarefa 12', 'Tarefa 13', 'Tarefa 14', 'Tarefa 15',
        'Tarefa 16', 'Tarefa 17', 'Tarefa 18', 'Tarefa 19', 'Tarefa 20',
        'Tarefa 21', 'Tarefa 22', 'Tarefa 23', 'Tarefa 24', 'Tarefa 25',
        'Tarefa 26', 'Tarefa 27', 'Tarefa 28', 'Tarefa 29', 'Tarefa 30'
      ];
    
      const taskPromises = taskTitles.map((title, index) => {
        return prisma.task.create({
          data: {
            title,
            completed: index % 2 === 0 ? TaskStatus.PENDING : TaskStatus.COMPLETED, // Alterna entre os 2 status
          },
        });
      });
    
      await Promise.all(taskPromises);
      console.log("Seed executada com sucesso")

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });