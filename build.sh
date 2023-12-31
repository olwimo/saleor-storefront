. .env
docker build . -t "olwimo/saleor-storefront:0.0.1" --build-arg NEXT_PUBLIC_SALEOR_API_URL="${NEXT_PUBLIC_SALEOR_API_URL}" --build-arg NEXT_PUBLIC_STOREFRONT_URL="${NEXT_PUBLIC_STOREFRONT_URL}" --build-arg SALEOR_APP_TOKEN="${SALEOR_APP_TOKEN}"
docker tag "olwimo/saleor-storefront:0.0.1" "olwimo/saleor-storefront:latest"
docker push -a "olwimo/saleor-storefront"
