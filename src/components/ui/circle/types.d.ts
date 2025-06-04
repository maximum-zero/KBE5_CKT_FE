export interface UserInfo {
  id: number;
  name: string;
}

export interface UserCircleProps {
  userInfo: UserInfo | null;
  onLogout?: (userId: number) => void;
}
