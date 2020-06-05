const uniqBy = <T>(key: keyof T, list: T[]): T[] => {
  const data: T[] = []

  for (const item of list) {
    const isMissing = data.findIndex((it) => it[key] === item[key]) === -1

    if (isMissing) {
      data.push(item)
    }
  }

  return data
}

export default uniqBy
