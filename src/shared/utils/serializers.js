// transform todos from airtable to todos used in app
export const deserializeEach = (resp) => {
  if (resp.records && resp.records.length === 1) {
    return {
      id: resp.records[0].id,
      title: resp.records[0].fields.title,
      completedAt: resp.records[0].fields.completedAt,
    };
  }
  return {
    id: resp.id,
    title: resp.fields.title,
    completedAt: resp.fields.completedAt,
  };
};

// transform app todos so airtable can use them
export const serializeNew = (todo) => {
  return {
    fields: {
      title: todo.title,
      completedAt: todo.completedAt,
    },
  };
};

export const serializeExisting = (todo) => {
  return {
    id: todo.id,
    fields: {
      title: todo.title,
      completedAt: todo.completedAt,
    },
  };
};
