import { createSelector } from 'reselect'
import { find } from 'lodash'

export const datasetsSelector = state => state.dataset.datasets
export const activeDatasetIdSelector = state => state.dataset.activeDatasetId
export const datasetsToCompareIdsSelector = state => state.dataset.datasetsToCompareIds

export const getActiveDataset = createSelector(
  datasetsSelector,
  activeDatasetIdSelector,
  (datasets, activeDatasetId) => find(datasets, { id: activeDatasetId })
)

export const getDatasetsToCompare = createSelector(
  datasetsSelector,
  datasetsToCompareIdsSelector,
  (datasets, datasetToCompareIds) => {
    if (!datasetToCompareIds) {
      return []
    }

    return datasetToCompareIds.map(datasetId => find(datasets, { id: datasetId }))
  }
)
