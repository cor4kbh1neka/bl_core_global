const EditContent = require('../../Domains/contnt/entities/EditContent');
const AddSiteMap = require('../../Domains/contnt/entities/AddSitemap');


class ContentUseCase {

    constructor({ contentRepository, cacheServices }) {

        this._contentRepository = contentRepository;
        this._cacheService = cacheServices;
    }
    /**
     ********************************************** 
     * @post  
     * @param {metagag}  
     * @returns 
     */

    async editmttag(useCasePayload, params) {
        const payload = new EditContent(useCasePayload);
        await this._contentRepository.editmtdt(payload, params.iddtmeta);
        await this._cacheService.delete(`metatag:metatag`);

        return 'metatag updated';
    }


    /**
     ********************************************** 
    * @post  
    * @param {metagag}  
    * @returns 
    */

    async getmttag() {
        try {
            const result = await this._cacheService.get(`metatag:metatag`);
            const dataresult = JSON.parse(result);
            dataresult.headers = {
                'X-Data-Source': 'cache',
            };
            return dataresult;
        } catch (error) {
            const dtmttag = await this._contentRepository.gettmtdt();
            await this._cacheService.delete(`metatag:metatag`);
            await this._cacheService.set(`metatag:metatag`, JSON.stringify(dtmttag));
            return dtmttag;

        }
    }

    async addstmp(useCasePayload) {
        const payload = new AddSiteMap(useCasePayload);
        await this._contentRepository.checkstmp(payload.urpage);
        await this._contentRepository.addstmp(payload.urpage);
        await this._cacheService.delete(`sitemap:sitemap`);
        return "sitemap added succesfully !";
    }
    async editstmpusecase(useCasePayload, params) {
        const payload = new AddSiteMap(useCasePayload);
        await this._contentRepository.checkstmp(payload.urpage);
        await this._contentRepository.editstmp(payload.urpage, params.urpage);
        await this._cacheService.delete(`sitemap:sitemap`);
        return "Sitemap Edit Success !";
    }

    async getstmp() {
        try {
            const result = await this._cacheService.get(`sitemap:sitemap`);
            const dataresult = JSON.parse(result);
            dataresult.headers = {
                'X-Data-Source': 'cache',
            };
            return dataresult;
        } catch (error) {
            const dtstmp = await this._contentRepository.getstmp();
            await this._cacheService.delete(`sitemap:sitemap`);
            await this._cacheService.set(`sitemap:sitemap`, JSON.stringify(dtstmp));
            return dtstmp;

        }
    }

    async delstmp(useCasePayload) {
        const payload = new AddSiteMap(useCasePayload);
        await this._contentRepository.delstmp(payload.urpage);
        await this._cacheService.delete(`sitemap:sitemap`);
        return "Sitemap deleted successfully !";
    }
}

module.exports = ContentUseCase;