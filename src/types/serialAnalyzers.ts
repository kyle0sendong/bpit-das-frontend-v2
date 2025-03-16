export type SerialAnalyzerType = {
  id: number;
  name: string;
  device_address: number;
  port_name: string;
  sampling: number;
  mode: string;
  ascii_command: string;
  baud_rate: number;
  parity: string;
  data_bits: number;
  stop_bits: number;
  flow_control: string;
}