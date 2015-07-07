import Marty from 'marty';

module.exports = Marty.createStateSource({
  type: 'http',
  id: 'MessageHttpAPI',

  getMessage() {
    return this.get('/api/test')
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error('Failed to get message');
      });
  }
});

