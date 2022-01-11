interface BaseResourceType {
  id: string;
  created_at: string;
}

export interface TaskType extends BaseResourceType {
  title: string;
  description: string;
  done: boolean;
  created_user_id: string;
}

export interface UserType extends BaseResourceType {
  name: string;
  email: string;
}

export interface TodoType extends BaseResourceType {
  todo: string;
  done: boolean;
  created_user_id: string;
}
