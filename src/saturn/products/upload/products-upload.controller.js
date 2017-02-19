export default class ProductsUploadCtrl {

    constructor(productUploadService) {
        this.productUploadService = productUploadService;

        this.adminUser = true;
    }

    uploadFile() {
        this.productUploadService.upload();
    }

}
