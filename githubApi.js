//-------------------------------------------------------------------------------
// Copyright IBM Corp. 2016
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//-------------------------------------------------------------------------------

import Promise from 'bluebird';
import request from 'request';

export const getUserRepos = user =>
  asyncGet(`/users/${user}/repos`, { type: 'all', per_page: 5 });

export const getRepoLanguages = (user, name) =>
  asyncGet(`/repos/${user}/${name}/languages`);

const GITHUB_BASE_URL = 'https://api.github.com';
function asyncGet(url = '/', qs = {}) {
  return new Promise((resolve, reject) => {
    request({
      qs,
      url: `${GITHUB_BASE_URL}${url}`,
      json: true,
      headers: {'user-agent': 'OpenWhisk Webpack Example'}
    }, (e, r, body) => {
      if (e) {
        reject(e);
      } else {
        resolve(body);
      }
    })
  });
}
