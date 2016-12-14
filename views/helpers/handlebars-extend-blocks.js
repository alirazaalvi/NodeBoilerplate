module.exports = (hbs) => {
  const blocks = Object.create(null);

  hbs.registerHelper('extend', (name, context) => {
    let block = blocks[name];
    if (!block) {
      block = blocks[name] = [];
    }

    block.push(context.fn(this));
  });

  hbs.registerHelper('block', (name) => {
    const val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
  });

  return hbs;
};
