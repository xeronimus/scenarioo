/* scenarioo-client
 * Copyright (C) 2014, scenarioo.org Development Team
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';


angular.module('scenarioo.controllers').controller('BranchAliasesCtrl', function ($scope, $location, $route, $modal, BranchAliasesResource, Config, BranchesResource) {

    BranchAliasesResource.query({}, function(branchAliases) {
        branchAliases.push(createEmptyAlias());
        $scope.branchAliases = branchAliases;
    });


    BranchesResource.query({}, function(branches) {
        $scope.branches = branches;
    });

    $scope.$on(Config.CONFIG_LOADED_EVENT, function() {
        $scope.configuration = Config.getRawConfigDataCopy();
    });

    Config.load();

    $scope.deleteEntry = function(aliasName) {
      if(aliasName !== '') {
          var index;
          for(index = 0; index < $scope.branchAliases.length; index++) {
            var branchAlias = $scope.branchAliases[index];
            if(branchAlias.name === aliasName) {
                console.log('found entry!');
                $scope.branchAliases.splice(index, 1);
                break;
            }
          }
      }
    };

    $scope.aliasNameChanged = function() {
        var aliasName = $scope.branchAliases[$scope.branchAliases.length -1].name;
        if(aliasName !== '') {
            $scope.branchAliases.push(createEmptyAlias());
        }
    };

    function createEmptyAlias() {
        return {
            name: '',
            referencedBranch: '',
            description: ''
        };
    }
});


