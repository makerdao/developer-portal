import { useContext } from 'react';
import { ResourceContext } from '../providers/ResourceProvider';

export default function useResources() {
  return useContext(ResourceContext) || {};
}
