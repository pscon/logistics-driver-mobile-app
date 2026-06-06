import { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  JobFeed: undefined;
  MyJobs: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList>;
  JobDetail: { jobId: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
