import { getKnownTvs } from '../../api/tv/service';
import { execSync } from 'child_process';
 
export const wakeUpTv = async (ip: string, port?: number) => {
  const tvs = getKnownTvs();
  const tvConfig = tvs.find((tv) => tv.ip === ip);
  if (!tvConfig) {
    throw new Error(`Not found config for tv with ip ${ip}`);
  }
  const { mac } = tvConfig;
  if (!mac) {
    throw new Error(`MAC address is not specified for tv ${ip}`);
  }
  if (port !== undefined) {
    return execSync(`wakeonlan -i ${ip} -p ${port} ${mac}`);
  } else {
    return execSync(`wakeonlan -i ${ip} ${mac}`);
  }
};
