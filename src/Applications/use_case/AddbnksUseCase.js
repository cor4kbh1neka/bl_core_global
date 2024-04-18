// const AddBnksDp = require('../../Domains/banks/entities/AddBnksDp');
const AddBnks = require('../../Domains/banks/entities/AddBnks');
const AddGroupBnks = require('../../Domains/banks/entities/AddGroupBnks');
const AddMasterBnks = require('../../Domains/banks/entities/AddMasterBnks');


class AddbnksUseCase {
    constructor({ bnksRepository, cacheServices }) {
        this._bnksRepository = bnksRepository;
        this._cacheService = cacheServices;

    }

    // async execute(useCasePayload) {

    //     const databks = new AddBnksDp(useCasePayload);

    //     await this._bnksRepository.checkbnks(databks.norekxyxy, databks.namegroupxyzt, databks.xynamarekx);
    //     const namegroup = await this._bnksRepository.databnksdp(databks);
    //     await this._cacheService.delete(`namegroup:${namegroup}`);
    //     return namegroup;
    // }

    /**
 ********************************************** 
 * @param {masterbank}  
 * @returns 
 */


    async admasterbank(useCasePayload) {
        const payload = new AddMasterBnks(useCasePayload);
        await this._bnksRepository.chckmstr(payload.bnkmstrxyxyx);
        const data = await this._bnksRepository.addmstr(payload);
        return data;
    }

    async putmasterbank(useCasePayload, params) {
        const payload = new AddMasterBnks(useCasePayload);
        const data = await this._bnksRepository.putmstrbnk(payload, params.mstrbnks);
        return data;
    }
    async getdtmstr() {

        const dtbnksmstr = await this._bnksRepository.getmstrbnk();

        return dtbnksmstr;
    }

    async delmasterdata(params) {
        await this._bnksRepository.findmstr(params.idbnkmaster);
        const data = await this._bnksRepository.delmstrbnk(params.idbnkmaster);
        return data;
    }
    /**
     ********************************************** 
     * @param {groupbank}  
     * @returns 
     */

    async addgrp(useCasePayload) {
        const addgroup = new AddGroupBnks(useCasePayload);
        const namegroup = await this._bnksRepository.addgrp(addgroup);
        return namegroup;
    }
    async getgroup() {
        const namegroup = await this._bnksRepository.getdtGroup();
        return namegroup;
    }
    async delgroupdata(params) {
        await this._bnksRepository.findgroup(params.idgroup);
        const data = await this._bnksRepository.delgroup(params.idgroup);
        return data;
    }

    /**
 ********************************************** 
 * @param {bankdata}  
 * @returns 
 */
    async addbnkdt(useCasePayload) {
        const payload = new AddBnks(useCasePayload);
        await this._bnksRepository.chckbnks(payload);
        const databanks = await this._bnksRepository.addbnks(payload);
        await this._cacheService.delete(`namegroup:${databanks.namegroupxyzt}`);
        return databanks;
    }


    async edtbank(useCasePayload, params) {
        const payload = new AddBnks(useCasePayload);
        const data = await this._bnksRepository.putbnks(payload, params.idbank);
        await this._cacheService.delete(`namegroup:${data.namegroupxyzt}`);
        return "Bank Edit Success !";
    }


    async getbankdt(params) {
        try {
            // mendapatkan catatan dari cache
            const result = await this._cacheService.get(`namegroup:${params.groupname}`);
            const dataresult = JSON.parse(result);

            dataresult.headers = {
                'X-Data-Source': 'cache',
            };
            return dataresult;
        } catch (error) {
            const getbankdata = await this._bnksRepository.getbnks(params.groupname);
            const getgroupbankdata = await this._bnksRepository.getgroupbnks(params.groupname);
            const getmasterbankdata = await this._bnksRepository.getmasterbnks(params.groupname);




            // const databankmaster = {}
            const bankbybankmaster = {};
            const groupedData = {};

            for (const master of getmasterbankdata) {
                const { bnkmstrxyxyx, ...datamaster } = master;
                bankbybankmaster[bnkmstrxyxyx] = {
                    url_logo: datamaster.urllogoxxyx, // Anda bisa mengisi URL logo bank dari 
                    statusxxyy: datamaster.statusxyxyy, // Anda bisa mengisi status dari getmasterbankdata
                };
                bankbybankmaster[bnkmstrxyxyx];
            }
            // Memasukkan data dari getbankdata ke dalam struktur yang diinginkan
            for (const bank of getbankdata) {
                const { namegroupxyzt, masterbnkxyxt, ...bankData } = bank;
                if (!groupedData[namegroupxyzt]) {
                    groupedData[getgroupbankdata[0].groupbank] = {};

                }
                if (!groupedData[getgroupbankdata[0].groupbank][masterbnkxyxt]) {
                    groupedData[getgroupbankdata[0].groupbank][masterbnkxyxt] = {
                        data_bank: []
                    };

                }
                // Jika ya, masukkan data bankbybankmaster ke dalam groupedData
                groupedData[getgroupbankdata[0].groupbank][masterbnkxyxt] = {
                    ...bankbybankmaster[masterbnkxyxt],
                    data_bank: groupedData[getgroupbankdata[0].groupbank][masterbnkxyxt].data_bank,
                };
                groupedData[getgroupbankdata[0].groupbank][masterbnkxyxt].data_bank.push(bankData);
            }


            // Memasukkan data ke dalam objek hasil
            // result[getgroupbankdata.groupbank] = groupedData;

            // console.log('ini params apk id' + params.apkid);
            await this._cacheService.delete(`namegroup:${params.groupname}`);
            await this._cacheService.set(`namegroup:${params.groupname}`, JSON.stringify(groupedData));
            // const databank = {
            //     data: groupedData,
            // };
            return groupedData;
        };
    }



}
module.exports = AddbnksUseCase;