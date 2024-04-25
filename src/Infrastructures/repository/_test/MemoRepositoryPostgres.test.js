const AddMemoTableTestHelper = require('../../../../tests/AddMemoTableTestHelper');

const InvariantError = require('../../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AddMemo = require('../../../Domains/memo/entities/AddMemo');
const pool = require('../../database/postgres/pool');
const MemoRepositoryPostgres = require('../MemoRepositoryPostgres');



describe('DataBank repository', () => {
  afterEach(async () => {
    await AddMemoTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('MEMO data FOR NOTIF', () => {

    describe('add MEMO data in redis', () => {
      it('should add data MEMO and return success', async () => {
        //arrange
        const addmemo = new AddMemo({
          statustype: 1,
          statuspriority: 1,
          subject: 'ini contoh subject 50 character',
          memo: 'ini contoh memo unlimited length character ini contoh memo unlimited length characterini contoh memo unlimited length character',
        });

        const memoRepositoryPostgres = new MemoRepositoryPostgres(pool);

        // Action
        const data = await memoRepositoryPostgres.addmemo(addmemo);

        expect(data).toStrictEqual('Add memo Success !');

      });
    });
  });
});
