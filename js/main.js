(function($){
    $(document).ready(function () {
        var pageNumber = 1;
        
        /**
         *The createNewBoxProduct function creates the html structure of the product grid.
         */
        function createNewBoxProduct(product){
            var boxProduct = document.createElement('div');
            boxProduct.classList.add('box-product');

            var boxProductBoxImg = document.createElement('div');
            boxProductBoxImg.classList.add('box-product__box-img');
            boxProduct.appendChild(boxProductBoxImg);

            var boxProductImg = document.createElement('img');
            boxProductImg.classList.add('box-product__img');

            boxProductBoxImg.appendChild(boxProductImg);
            boxProductImg.setAttribute('src','http:'+ product.image);

            var boxProductName = document.createElement('p');
            boxProductName.classList.add('box-product__name');
            boxProductName.innerHTML=product.name;
            boxProduct.appendChild(boxProductName);

            var boxProductDescription = document.createElement('p');
            boxProductDescription.classList.add('box-product__description');
            boxProductDescription.innerHTML=product.description;
            boxProduct.appendChild(boxProductDescription);

            var boxProductOldPrice = document.createElement('p');
            boxProductOldPrice.classList.add('box-product__old-price');
            boxProductOldPrice.innerHTML='De: '+product.oldPrice.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"});;
            boxProduct.appendChild(boxProductOldPrice);

            var boxProductPrice = document.createElement('p');
            boxProductPrice.classList.add('box-product__price');
            boxProductPrice.innerHTML='Por: '+product.price.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"});;
            boxProduct.appendChild(boxProductPrice);

            var boxProductInstallments = document.createElement('p');
            var installmentValue = product.installments.value.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"});
            var installmentsContent = 'ou '+product.installments.count+'x de '+ installmentValue;
            boxProductInstallments.classList.add('box-product__installments');
            boxProductInstallments.innerHTML=installmentsContent;
            boxProduct.appendChild(boxProductInstallments);

            var boxProductBtn = document.createElement('button');
            boxProductBtn.classList.add('box-product__btn');

            boxProduct.appendChild(boxProductBtn);
            boxProductBtn.innerHTML='Comprar';

            $('.gallery')[0].appendChild(boxProduct);
        }
        
        /**
         *The callToAPI function fetches the information from the grid and refreshes the pageNumber.
         */
        function callToAPI(){
            var urlStr = "https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page="+pageNumber;
            $.ajax({
                type: "get",
                url: urlStr,
                data: "data",
                dataType: "json",
                success: function (data) {
                    pageNumber++;
                    $.each( data.products, function( key, product ) {
                        createNewBoxProduct(product);
                    });
                }
            });
        }
        callToAPI();


        /**
         *Load more products on the landing page.
         */
        $('.load-more').click(function(){
            callToAPI();
        })
    });
})(jQuery);