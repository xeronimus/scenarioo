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

angular.module('scenarioo.filters').filter('branchOrderBy', branchOrderByFilter);


function branchOrderByFilter() {


    /**
     * comparator function that will order given branch resource objects as follows:
     *
     * 1. branches that are marked as "alias" before others
     * 2. then alphabetically (case ignored)
     *
     * @param {object} branchA
     * @param {object} branchB
     * @returns {number}
     */
    function branchComparator(branchA, branchB) {
        if (branchA.alias === true && branchB.alias !== true) {
            return -1;
        }

        if (branchB.alias === true && branchA.alias !== true) {
            return 1;
        }

        // both are an alias or none is an alias -> use alphabetical ordering
        var branchAName = branchA.branch.name.toLowerCase();
        var branchBName = branchB.branch.name.toLowerCase();

        if (branchAName < branchBName) {
            return -1;
        }

        if (branchBName < branchAName) {
            return 1;
        }

        return 0;

    }

    return function (input) {

        if (!angular.isArray(input)) {
            return input;
        }

        input.sort(branchComparator);

        return input;
    };

}
