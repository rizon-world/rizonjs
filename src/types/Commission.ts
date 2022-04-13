import { CommissionRates } from './CommissionRates';

/** Commission defines commission parameters for a given validator. */
export interface Commission {
    commissionRates?: CommissionRates;
    updateTime?: Date;
}
