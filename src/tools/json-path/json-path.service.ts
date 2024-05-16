import { JSONPath } from 'jsonpath-plus';

export { jsonExtra };

function jsonExtra(rawJson: string, extraPath: string) {
  const json = JSON.parse(rawJson.trim());
  const path = extraPath.trim();
  if (!json || !path) {
    return '';
  }
  const jsonRet = JSONPath({ path, json });
  return JSON.stringify(jsonRet, null, 3);
}
