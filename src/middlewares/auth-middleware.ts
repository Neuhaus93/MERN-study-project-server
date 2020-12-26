const firbase = require('../firebase');
import { AuthChecker } from 'type-graphql';
import { ContextType } from '../types';

export const authChecker: AuthChecker<ContextType> = async ({ context }) => {
  const headerToken = context.authorization;

  if (!headerToken || headerToken.split(' ')[0] !== 'Bearer') {
    return false;
  }

  const token = headerToken.split(' ')[1];

  try {
    const decodedToken = await firbase.auth().verifyIdToken(token);
    context.firebaseId = decodedToken.uid;
    return true;
  } catch {
    return false;
  }
};
