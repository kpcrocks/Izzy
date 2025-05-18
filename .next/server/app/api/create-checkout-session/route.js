/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/create-checkout-session/route";
exports.ids = ["app/api/create-checkout-session/route"];
exports.modules = {

/***/ "(rsc)/./app/api/create-checkout-session/route.ts":
/*!**************************************************!*\
  !*** ./app/api/create-checkout-session/route.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! stripe */ \"(rsc)/./node_modules/stripe/esm/stripe.esm.node.js\");\n\n\nlet stripe = null;\nasync function POST(request) {\n    try {\n        // Check if required environment variables are set\n        if (!process.env.STRIPE_SECRET_KEY) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'STRIPE_SECRET_KEY is not set in environment variables'\n            }, {\n                status: 500\n            });\n        }\n        if (false) {}\n        // Initialize Stripe if not already initialized\n        if (!stripe) {\n            stripe = new stripe__WEBPACK_IMPORTED_MODULE_1__[\"default\"](process.env.STRIPE_SECRET_KEY, {\n                apiVersion: '2025-02-24.acacia'\n            });\n        }\n        const body = await request.json();\n        const { items, shipping } = body;\n        if (!items?.length) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'No items provided in the request'\n            }, {\n                status: 400\n            });\n        }\n        // Ensure all required item fields are present\n        for (const item of items){\n            if (!item.name || !item.price || !item.quantity) {\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    error: 'Invalid item data: missing required fields'\n                }, {\n                    status: 400\n                });\n            }\n        }\n        // Create Stripe checkout session\n        const session = await stripe.checkout.sessions.create({\n            payment_method_types: [\n                'card'\n            ],\n            line_items: items.map((item)=>({\n                    price_data: {\n                        currency: 'usd',\n                        product_data: {\n                            name: item.name,\n                            images: item.image ? [\n                                new URL(item.image, \"http://localhost:3000\").toString()\n                            ] : undefined\n                        },\n                        unit_amount: Math.round(item.price * 100)\n                    },\n                    quantity: item.quantity\n                })),\n            shipping_options: [\n                {\n                    shipping_rate_data: {\n                        type: 'fixed_amount',\n                        fixed_amount: {\n                            amount: Math.round(shipping * 100),\n                            currency: 'usd'\n                        },\n                        display_name: 'Standard Shipping',\n                        delivery_estimate: {\n                            minimum: {\n                                unit: 'business_day',\n                                value: 5\n                            },\n                            maximum: {\n                                unit: 'business_day',\n                                value: 7\n                            }\n                        }\n                    }\n                }\n            ],\n            mode: 'payment',\n            success_url: `${\"http://localhost:3000\"}/payment-success?session_id={CHECKOUT_SESSION_ID}`,\n            cancel_url: `${\"http://localhost:3000\"}/cart`\n        });\n        if (!session?.url) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Failed to create Stripe checkout session URL'\n            }, {\n                status: 500\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            url: session.url\n        });\n    } catch (error) {\n        console.error('Error:', error);\n        // Return more specific error message\n        const errorMessage = error instanceof Error ? error.message : 'An error occurred while creating the checkout session';\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: errorMessage\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NyZWF0ZS1jaGVja291dC1zZXNzaW9uL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUEyQztBQUNmO0FBRTVCLElBQUlFLFNBQXdCO0FBRXJCLGVBQWVDLEtBQUtDLE9BQWdCO0lBQ3pDLElBQUk7UUFDRixrREFBa0Q7UUFDbEQsSUFBSSxDQUFDQyxRQUFRQyxHQUFHLENBQUNDLGlCQUFpQixFQUFFO1lBQ2xDLE9BQU9QLHFEQUFZQSxDQUFDUSxJQUFJLENBQ3RCO2dCQUFFQyxPQUFPO1lBQXdELEdBQ2pFO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxJQUFJLEtBQWlDLEVBQUUsRUFLdEM7UUFFRCwrQ0FBK0M7UUFDL0MsSUFBSSxDQUFDUixRQUFRO1lBQ1hBLFNBQVMsSUFBSUQsOENBQU1BLENBQUNJLFFBQVFDLEdBQUcsQ0FBQ0MsaUJBQWlCLEVBQUU7Z0JBQ2pESyxZQUFZO1lBQ2Q7UUFDRjtRQUVBLE1BQU1DLE9BQU8sTUFBTVQsUUFBUUksSUFBSTtRQUMvQixNQUFNLEVBQUVNLEtBQUssRUFBRUMsUUFBUSxFQUFFLEdBQUdGO1FBRTVCLElBQUksQ0FBQ0MsT0FBT0UsUUFBUTtZQUNsQixPQUFPaEIscURBQVlBLENBQUNRLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBbUMsR0FDNUM7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLDhDQUE4QztRQUM5QyxLQUFLLE1BQU1PLFFBQVFILE1BQU87WUFDeEIsSUFBSSxDQUFDRyxLQUFLQyxJQUFJLElBQUksQ0FBQ0QsS0FBS0UsS0FBSyxJQUFJLENBQUNGLEtBQUtHLFFBQVEsRUFBRTtnQkFDL0MsT0FBT3BCLHFEQUFZQSxDQUFDUSxJQUFJLENBQ3RCO29CQUFFQyxPQUFPO2dCQUE2QyxHQUN0RDtvQkFBRUMsUUFBUTtnQkFBSTtZQUVsQjtRQUNGO1FBRUEsaUNBQWlDO1FBQ2pDLE1BQU1XLFVBQVUsTUFBTW5CLE9BQU9vQixRQUFRLENBQUNDLFFBQVEsQ0FBQ0MsTUFBTSxDQUFDO1lBQ3BEQyxzQkFBc0I7Z0JBQUM7YUFBTztZQUM5QkMsWUFBWVosTUFBTWEsR0FBRyxDQUFDLENBQUNWLE9BQWU7b0JBQ3BDVyxZQUFZO3dCQUNWQyxVQUFVO3dCQUNWQyxjQUFjOzRCQUNaWixNQUFNRCxLQUFLQyxJQUFJOzRCQUNmYSxRQUFRZCxLQUFLZSxLQUFLLEdBQUc7Z0NBQUMsSUFBSUMsSUFBSWhCLEtBQUtlLEtBQUssRUFBRTNCLHVCQUFnQyxFQUFFNkIsUUFBUTs2QkFBRyxHQUFHQzt3QkFDNUY7d0JBQ0FDLGFBQWFDLEtBQUtDLEtBQUssQ0FBQ3JCLEtBQUtFLEtBQUssR0FBRztvQkFDdkM7b0JBQ0FDLFVBQVVILEtBQUtHLFFBQVE7Z0JBQ3pCO1lBQ0FtQixrQkFBa0I7Z0JBQ2hCO29CQUNFQyxvQkFBb0I7d0JBQ2xCQyxNQUFNO3dCQUNOQyxjQUFjOzRCQUNaQyxRQUFRTixLQUFLQyxLQUFLLENBQUN2QixXQUFXOzRCQUM5QmMsVUFBVTt3QkFDWjt3QkFDQWUsY0FBYzt3QkFDZEMsbUJBQW1COzRCQUNqQkMsU0FBUztnQ0FDUEMsTUFBTTtnQ0FDTkMsT0FBTzs0QkFDVDs0QkFDQUMsU0FBUztnQ0FDUEYsTUFBTTtnQ0FDTkMsT0FBTzs0QkFDVDt3QkFDRjtvQkFDRjtnQkFDRjthQUNEO1lBQ0RFLE1BQU07WUFDTkMsYUFBYSxHQUFHOUMsdUJBQWdDLENBQUMsaURBQWlELENBQUM7WUFDbkcrQyxZQUFZLEdBQUcvQyx1QkFBZ0MsQ0FBQyxLQUFLLENBQUM7UUFDeEQ7UUFFQSxJQUFJLENBQUNnQixTQUFTZ0MsS0FBSztZQUNqQixPQUFPckQscURBQVlBLENBQUNRLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBK0MsR0FDeEQ7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLE9BQU9WLHFEQUFZQSxDQUFDUSxJQUFJLENBQUM7WUFBRTZDLEtBQUtoQyxRQUFRZ0MsR0FBRztRQUFDO0lBQzlDLEVBQUUsT0FBTzVDLE9BQU87UUFDZDZDLFFBQVE3QyxLQUFLLENBQUMsVUFBVUE7UUFDeEIscUNBQXFDO1FBQ3JDLE1BQU04QyxlQUFlOUMsaUJBQWlCK0MsUUFBUS9DLE1BQU1nRCxPQUFPLEdBQUc7UUFDOUQsT0FBT3pELHFEQUFZQSxDQUFDUSxJQUFJLENBQ3RCO1lBQUVDLE9BQU84QztRQUFhLEdBQ3RCO1lBQUU3QyxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL3RvbW15dHJ1b25nL0RvY3VtZW50cy9HaXRIdWIvSXp6eS9hcHAvYXBpL2NyZWF0ZS1jaGVja291dC1zZXNzaW9uL3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcbmltcG9ydCBTdHJpcGUgZnJvbSAnc3RyaXBlJztcblxubGV0IHN0cmlwZTogU3RyaXBlIHwgbnVsbCA9IG51bGw7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICAvLyBDaGVjayBpZiByZXF1aXJlZCBlbnZpcm9ubWVudCB2YXJpYWJsZXMgYXJlIHNldFxuICAgIGlmICghcHJvY2Vzcy5lbnYuU1RSSVBFX1NFQ1JFVF9LRVkpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogJ1NUUklQRV9TRUNSRVRfS0VZIGlzIG5vdCBzZXQgaW4gZW52aXJvbm1lbnQgdmFyaWFibGVzJyB9LFxuICAgICAgICB7IHN0YXR1czogNTAwIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCFwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiAnTkVYVF9QVUJMSUNfQkFTRV9VUkwgaXMgbm90IHNldCBpbiBlbnZpcm9ubWVudCB2YXJpYWJsZXMnIH0sXG4gICAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXplIFN0cmlwZSBpZiBub3QgYWxyZWFkeSBpbml0aWFsaXplZFxuICAgIGlmICghc3RyaXBlKSB7XG4gICAgICBzdHJpcGUgPSBuZXcgU3RyaXBlKHByb2Nlc3MuZW52LlNUUklQRV9TRUNSRVRfS0VZLCB7XG4gICAgICAgIGFwaVZlcnNpb246ICcyMDI1LTAyLTI0LmFjYWNpYScsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XG4gICAgY29uc3QgeyBpdGVtcywgc2hpcHBpbmcgfSA9IGJvZHk7XG5cbiAgICBpZiAoIWl0ZW1zPy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogJ05vIGl0ZW1zIHByb3ZpZGVkIGluIHRoZSByZXF1ZXN0JyB9LFxuICAgICAgICB7IHN0YXR1czogNDAwIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gRW5zdXJlIGFsbCByZXF1aXJlZCBpdGVtIGZpZWxkcyBhcmUgcHJlc2VudFxuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgaWYgKCFpdGVtLm5hbWUgfHwgIWl0ZW0ucHJpY2UgfHwgIWl0ZW0ucXVhbnRpdHkpIHtcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICAgIHsgZXJyb3I6ICdJbnZhbGlkIGl0ZW0gZGF0YTogbWlzc2luZyByZXF1aXJlZCBmaWVsZHMnIH0sXG4gICAgICAgICAgeyBzdGF0dXM6IDQwMCB9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIFN0cmlwZSBjaGVja291dCBzZXNzaW9uXG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IHN0cmlwZS5jaGVja291dC5zZXNzaW9ucy5jcmVhdGUoe1xuICAgICAgcGF5bWVudF9tZXRob2RfdHlwZXM6IFsnY2FyZCddLFxuICAgICAgbGluZV9pdGVtczogaXRlbXMubWFwKChpdGVtOiBhbnkpID0+ICh7XG4gICAgICAgIHByaWNlX2RhdGE6IHtcbiAgICAgICAgICBjdXJyZW5jeTogJ3VzZCcsXG4gICAgICAgICAgcHJvZHVjdF9kYXRhOiB7XG4gICAgICAgICAgICBuYW1lOiBpdGVtLm5hbWUsXG4gICAgICAgICAgICBpbWFnZXM6IGl0ZW0uaW1hZ2UgPyBbbmV3IFVSTChpdGVtLmltYWdlLCBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCkudG9TdHJpbmcoKV0gOiB1bmRlZmluZWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB1bml0X2Ftb3VudDogTWF0aC5yb3VuZChpdGVtLnByaWNlICogMTAwKSwgLy8gQ29udmVydCB0byBjZW50c1xuICAgICAgICB9LFxuICAgICAgICBxdWFudGl0eTogaXRlbS5xdWFudGl0eSxcbiAgICAgIH0pKSxcbiAgICAgIHNoaXBwaW5nX29wdGlvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHNoaXBwaW5nX3JhdGVfZGF0YToge1xuICAgICAgICAgICAgdHlwZTogJ2ZpeGVkX2Ftb3VudCcsXG4gICAgICAgICAgICBmaXhlZF9hbW91bnQ6IHtcbiAgICAgICAgICAgICAgYW1vdW50OiBNYXRoLnJvdW5kKHNoaXBwaW5nICogMTAwKSwgLy8gQ29udmVydCB0byBjZW50c1xuICAgICAgICAgICAgICBjdXJyZW5jeTogJ3VzZCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGlzcGxheV9uYW1lOiAnU3RhbmRhcmQgU2hpcHBpbmcnLFxuICAgICAgICAgICAgZGVsaXZlcnlfZXN0aW1hdGU6IHtcbiAgICAgICAgICAgICAgbWluaW11bToge1xuICAgICAgICAgICAgICAgIHVuaXQ6ICdidXNpbmVzc19kYXknLFxuICAgICAgICAgICAgICAgIHZhbHVlOiA1LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBtYXhpbXVtOiB7XG4gICAgICAgICAgICAgICAgdW5pdDogJ2J1c2luZXNzX2RheScsXG4gICAgICAgICAgICAgICAgdmFsdWU6IDcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgbW9kZTogJ3BheW1lbnQnLFxuICAgICAgc3VjY2Vzc191cmw6IGAke3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMfS9wYXltZW50LXN1Y2Nlc3M/c2Vzc2lvbl9pZD17Q0hFQ0tPVVRfU0VTU0lPTl9JRH1gLFxuICAgICAgY2FuY2VsX3VybDogYCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQkFTRV9VUkx9L2NhcnRgLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51cmwpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogJ0ZhaWxlZCB0byBjcmVhdGUgU3RyaXBlIGNoZWNrb3V0IHNlc3Npb24gVVJMJyB9LFxuICAgICAgICB7IHN0YXR1czogNTAwIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgdXJsOiBzZXNzaW9uLnVybCB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvcjonLCBlcnJvcik7XG4gICAgLy8gUmV0dXJuIG1vcmUgc3BlY2lmaWMgZXJyb3IgbWVzc2FnZVxuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIGNyZWF0aW5nIHRoZSBjaGVja291dCBzZXNzaW9uJztcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IGVycm9yOiBlcnJvck1lc3NhZ2UgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH1cbn0gIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIlN0cmlwZSIsInN0cmlwZSIsIlBPU1QiLCJyZXF1ZXN0IiwicHJvY2VzcyIsImVudiIsIlNUUklQRV9TRUNSRVRfS0VZIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwiTkVYVF9QVUJMSUNfQkFTRV9VUkwiLCJhcGlWZXJzaW9uIiwiYm9keSIsIml0ZW1zIiwic2hpcHBpbmciLCJsZW5ndGgiLCJpdGVtIiwibmFtZSIsInByaWNlIiwicXVhbnRpdHkiLCJzZXNzaW9uIiwiY2hlY2tvdXQiLCJzZXNzaW9ucyIsImNyZWF0ZSIsInBheW1lbnRfbWV0aG9kX3R5cGVzIiwibGluZV9pdGVtcyIsIm1hcCIsInByaWNlX2RhdGEiLCJjdXJyZW5jeSIsInByb2R1Y3RfZGF0YSIsImltYWdlcyIsImltYWdlIiwiVVJMIiwidG9TdHJpbmciLCJ1bmRlZmluZWQiLCJ1bml0X2Ftb3VudCIsIk1hdGgiLCJyb3VuZCIsInNoaXBwaW5nX29wdGlvbnMiLCJzaGlwcGluZ19yYXRlX2RhdGEiLCJ0eXBlIiwiZml4ZWRfYW1vdW50IiwiYW1vdW50IiwiZGlzcGxheV9uYW1lIiwiZGVsaXZlcnlfZXN0aW1hdGUiLCJtaW5pbXVtIiwidW5pdCIsInZhbHVlIiwibWF4aW11bSIsIm1vZGUiLCJzdWNjZXNzX3VybCIsImNhbmNlbF91cmwiLCJ1cmwiLCJjb25zb2xlIiwiZXJyb3JNZXNzYWdlIiwiRXJyb3IiLCJtZXNzYWdlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/create-checkout-session/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcreate-checkout-session%2Froute&page=%2Fapi%2Fcreate-checkout-session%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcreate-checkout-session%2Froute.ts&appDir=%2FUsers%2Ftommytruong%2FDocuments%2FGitHub%2FIzzy%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Ftommytruong%2FDocuments%2FGitHub%2FIzzy&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcreate-checkout-session%2Froute&page=%2Fapi%2Fcreate-checkout-session%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcreate-checkout-session%2Froute.ts&appDir=%2FUsers%2Ftommytruong%2FDocuments%2FGitHub%2FIzzy%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Ftommytruong%2FDocuments%2FGitHub%2FIzzy&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_tommytruong_Documents_GitHub_Izzy_app_api_create_checkout_session_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/create-checkout-session/route.ts */ \"(rsc)/./app/api/create-checkout-session/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/create-checkout-session/route\",\n        pathname: \"/api/create-checkout-session\",\n        filename: \"route\",\n        bundlePath: \"app/api/create-checkout-session/route\"\n    },\n    resolvedPagePath: \"/Users/tommytruong/Documents/GitHub/Izzy/app/api/create-checkout-session/route.ts\",\n    nextConfigOutput,\n    userland: _Users_tommytruong_Documents_GitHub_Izzy_app_api_create_checkout_session_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjcmVhdGUtY2hlY2tvdXQtc2Vzc2lvbiUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGY3JlYXRlLWNoZWNrb3V0LXNlc3Npb24lMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZjcmVhdGUtY2hlY2tvdXQtc2Vzc2lvbiUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnRvbW15dHJ1b25nJTJGRG9jdW1lbnRzJTJGR2l0SHViJTJGSXp6eSUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZ0b21teXRydW9uZyUyRkRvY3VtZW50cyUyRkdpdEh1YiUyRkl6enkmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ2lDO0FBQzlHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvdG9tbXl0cnVvbmcvRG9jdW1lbnRzL0dpdEh1Yi9Jenp5L2FwcC9hcGkvY3JlYXRlLWNoZWNrb3V0LXNlc3Npb24vcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2NyZWF0ZS1jaGVja291dC1zZXNzaW9uL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvY3JlYXRlLWNoZWNrb3V0LXNlc3Npb25cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2NyZWF0ZS1jaGVja291dC1zZXNzaW9uL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL3RvbW15dHJ1b25nL0RvY3VtZW50cy9HaXRIdWIvSXp6eS9hcHAvYXBpL2NyZWF0ZS1jaGVja291dC1zZXNzaW9uL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcreate-checkout-session%2Froute&page=%2Fapi%2Fcreate-checkout-session%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcreate-checkout-session%2Froute.ts&appDir=%2FUsers%2Ftommytruong%2FDocuments%2FGitHub%2FIzzy%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Ftommytruong%2FDocuments%2FGitHub%2FIzzy&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/stripe","vendor-chunks/math-intrinsics","vendor-chunks/es-errors","vendor-chunks/qs","vendor-chunks/call-bind-apply-helpers","vendor-chunks/get-proto","vendor-chunks/object-inspect","vendor-chunks/has-symbols","vendor-chunks/gopd","vendor-chunks/function-bind","vendor-chunks/side-channel","vendor-chunks/side-channel-weakmap","vendor-chunks/side-channel-map","vendor-chunks/side-channel-list","vendor-chunks/hasown","vendor-chunks/get-intrinsic","vendor-chunks/es-object-atoms","vendor-chunks/es-define-property","vendor-chunks/dunder-proto","vendor-chunks/call-bound"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcreate-checkout-session%2Froute&page=%2Fapi%2Fcreate-checkout-session%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcreate-checkout-session%2Froute.ts&appDir=%2FUsers%2Ftommytruong%2FDocuments%2FGitHub%2FIzzy%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Ftommytruong%2FDocuments%2FGitHub%2FIzzy&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();