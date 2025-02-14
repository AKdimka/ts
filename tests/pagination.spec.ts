import { test, expect, request } from '@playwright/test';

const GRAPHQL_URL = 'https://admin.piknik-dev.com.ua/api/admin/graphql/query';
const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbHBoYSI6IjAxOGZiYWU4LWI0ZDctN2Y0MS04NzQ4LTdhYTE3YThkMzRkZiIsImJldGEiOiJ0bnQiLCJleHAiOjE3NDAwNDg5NjF9.6cmGoiViu3PwFafcWV58FgJ8D9YlcqZDXyshImNP62g';

test('Тест пагинации GraphQL', async () => {
  const apiRequest = await request.newContext();

  const firstPageResponse = await apiRequest.post(GRAPHQL_URL, {
    headers: {
      'Content-Type': 'application/json',
			'Authorization': `Bearer ${AUTH_TOKEN}`,
			'pxpj-key': 'dX1uVRyIg'
    },
    data: {
      query: `
        query FindMany($input: ProductsInput) {
          productQuery {
						findMany(input: $input) {
							data {
								content {
									title
									locale
									id
								}
								id
								requiresShipping
							}
						}
					}
				}
      `,
			variables: {
        input: {
          page: 1,
        },
      },
    },
  }); 

  expect(firstPageResponse.ok()).toBeTruthy();

  const firstPageData = await firstPageResponse.json();
  console.log('Первая страница:', firstPageData);

	
	expect(firstPageData.data.productQuery.findMany.data.length).toBeGreaterThan(0);
	
	console.log(firstPageData.data.productQuery.findMany)

  expect(firstPageData.data.productQuery.findMany/* .hasNextPage */).toBe(true);

  //const endCursor = firstPageData.data.products.pageInfo.endCursor;

  // Запрос второй страницы
  const secondPageResponse = await apiRequest.post(GRAPHQL_URL, {
    headers: {
      'Content-Type': 'application/json',
			'Authorization': `Bearer ${AUTH_TOKEN}`,
			'pxpj-key': 'dX1uVRyIg'
    },
    data: {
      query: `
        query FindMany($input: ProductsInput) {
          productQuery {
						findMany(input: $input) {
							data {
								content {
									title
									locale
									id
								}
								id
								requiresShipping
							}
						}
					}
				}
      `,
			variables: {
        input: {
          page: 2,
        },
      },
    },
  });

  expect(secondPageResponse.ok()).toBeTruthy();

  const secondPageData = await secondPageResponse.json();
  console.log('Вторая страница:', secondPageData);

  // Проверяем, что вторая страница вернула другие данные
	expect(secondPageData.data.productQuery.findMany.data.length).toBeGreaterThan(0);
	console.log(secondPageData.data.productQuery.findMany.data[0].id);

  expect(secondPageData.data.productQuery.findMany.data[0].id).not.toBe(
    firstPageData.data.productQuery.findMany.data[0].id
);
});