const EditContent = require('../../Domains/contnt/entities/EditContent');
const AddSiteMap = require('../../Domains/contnt/entities/AddSitemap');
const EditGeneral = require('../../Domains/contnt/entities/EditGeneral');
const EditSlider = require('../../Domains/contnt/entities/EditSlider');


class ContentUseCase {

    constructor({ contentRepository, cacheServices }) {

        this._contentRepository = contentRepository;
        this._cacheService = cacheServices;
    }


    async editmttag(useCasePayload, params) {
        const payload = new EditContent(useCasePayload);
        await this._contentRepository.editmtdt(payload, params.iddtmeta);
        await this._cacheService.delete(`metatag:metatag`);

        return 'metatag updated';
    }

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

    async editgeneral(useCasePayload, params) {
        const payload = new EditGeneral(useCasePayload);
        await this._contentRepository.editgeneral(payload, params.idnmwebst);
        await this._cacheService.delete(`ctgeneral:ctgeneral`);
        return 'general data updated';
    }
    async getgeneral() {
        try {
            const result = await this._cacheService.get(`ctgeneral:ctgeneral`);
            const dataresult = JSON.parse(result);
            dataresult.headers = {
                'X-Data-Source': 'cache',
            };
            return dataresult;
        } catch (error) {
            const dtgeneral = await this._contentRepository.getgeneral();
            await this._cacheService.delete(`ctgeneral:ctgeneral`);
            await this._cacheService.set(`ctgeneral:ctgeneral`, JSON.stringify(dtgeneral));
            return dtgeneral;
        }
    }

    async editslider(useCasePayload, params) {
        console.log(useCasePayload);
        const payload = new EditSlider(useCasePayload);
        await this._contentRepository.editslider(payload, params.idctsldr);
        await this._cacheService.delete(`ctslider:ctslider`);
        return 'slider data updated';
    }

    async getslider() {
        try {
            const result = await this._cacheService.get(`ctslider:ctslider`);
            const dataresult = JSON.parse(result);
            dataresult.headers = {
                'X-Data-Source': 'cache',
            };
            return dataresult;
        } catch (error) {
            const dtslider = await this._contentRepository.getslider();
            await this._cacheService.delete(`ctslider:ctslider`);
            await this._cacheService.set(`ctslider:ctslider`, JSON.stringify(dtslider));
            return dtslider;
        }
    }
}

module.exports = ContentUseCase;