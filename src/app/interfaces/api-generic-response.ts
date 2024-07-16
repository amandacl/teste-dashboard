type Metadata = {
  resultset: {
    count: number
  }
}

export type ApiGenericResponse<T> = {
  metadata: Metadata
  results: T
}
