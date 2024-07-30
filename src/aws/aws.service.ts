import { Injectable } from '@nestjs/common';
import {
  CloudWatchClient,
  PutMetricDataCommand,
  StandardUnit,
} from '@aws-sdk/client-cloudwatch';

@Injectable()
export class AwsService {
  private cloudWatchClient: CloudWatchClient;

  constructor() {
    this.cloudWatchClient = new CloudWatchClient({
      region: 'us-east-2',
    });
  }

  private async putMetricData(
    Namespace: string,
    metricName: string,
    value: number,
    dimensions?: { Name: string; Value: string }[],
  ): Promise<void> {
    const params = {
      MetricData: [
        {
          MetricName: metricName,
          Dimensions: dimensions || [],
          Unit: StandardUnit.Count,
          Value: value,
        },
      ],
      Namespace,
    };

    try {
      const command = new PutMetricDataCommand(params);
      await this.cloudWatchClient.send(command);
    } catch (error) {
      console.error('Error putting metric data:', error);
    }
  }

  async recordUserAccess({
    userType,
    endpoint,
    ableToAccess,
  }: {
    userType: string;
    endpoint: string;
    ableToAccess: 'true' | 'false';
  }): Promise<void> {
    const dimensions = [
      { Name: 'UserType', Value: userType },
      { Name: 'Endpoint', Value: endpoint },
      { Name: 'AbleToAccess', Value: ableToAccess },
    ];

    await this.putMetricData('UserAccessMetrics', 'UserLogin', 1, dimensions);
  }
}
