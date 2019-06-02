import { createSelector } from 'reselect'
import { find } from 'lodash'

export const datasetsSelector = state => state.dataset.datasets
export const activeDatasetIdSelector = state => state.dataset.activeDatasetId

export const getActiveDataset = createSelector(
  datasetsSelector,
  activeDatasetIdSelector,
  (datasets, activeDatasetId) => find(datasets, { id: activeDatasetId })
)
