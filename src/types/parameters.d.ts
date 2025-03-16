export type ParameterType = {
  id: number;
  name: string;
  unit: string;
  enable: boolean;
  request_interval: number;
  format: string;
  function_code: string;
  start_register_address: number;
  register_count: number;
  formula: string;
  analyzer_id: number;
  ascii_command?: string;
}

export type InsertParameterType = {
  id: number,
  number: number
}