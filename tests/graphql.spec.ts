import { test, expect, request } from '@playwright/test';

test('GraphQL: Выполнение запроса к API Piknik', async ({}) => {
  const apiRequest = await request.newContext();

  const response = await apiRequest.post('https://admin.piknik-dev.com.ua/api/admin/graphql/query', {
    data: {
      query:  `
        query {
          userQuery {
            me {
              id
            }
          }
        }
      `,
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbHBoYSI6IjAxOGZiYWU4LWI0ZDctN2Y0MS04NzQ4LTdhYTE3YThkMzRkZiIsImJldGEiOiJ0bnQiLCJleHAiOjE3NDAwNDg5NjF9.6cmGoiViu3PwFafcWV58FgJ8D9YlcqZDXyshImNP62g`,
    },
  });

  expect(response.ok()).toBeTruthy();

  const responseBody = await response.json();
	console.log('Полный ответ API:', JSON.stringify(responseBody, null, 2)); 
	
  if (responseBody.errors) {
    console.error('GraphQL Errors:', responseBody.errors);
    throw new Error('GraphQL вернул ошибки');
  }

  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('userQuery');
  expect(responseBody.data.userQuery).toHaveProperty('me');
  expect(responseBody.data.userQuery.me).toHaveProperty('id');
});