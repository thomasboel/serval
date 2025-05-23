import { Command } from '@commander-js/extra-typings';

import { stop as stopServices } from '../service/stop.js';
import store from '../../utils/store.js';
import { withErrorHandler } from '../../utils/errorHandler.js';

export async function stop(serviceGroupName: string): Promise<void> {
  const serviceGroups = store.get('serviceGroups') ?? [];

  const serviceGroup = serviceGroups.find(
    (group) => group.name === serviceGroupName,
  );

  if (!serviceGroup) {
    throw new Error(
      `Service group with the name "${serviceGroupName}" does not exist`,
    );
  }

  await stopServices(serviceGroup.services);
}

export default new Command('stop')
  .description('Stop all the services from the group')
  .argument('<group>')
  .action(withErrorHandler(stop));
