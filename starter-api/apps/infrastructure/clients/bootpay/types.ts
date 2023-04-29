export type CertificateData = {
  birth: string;
  name: string;
  gender: number;
  unique: string;
  di: string;
};
export type CertificateResult = {
  success: boolean;
  data?: CertificateData;
};
