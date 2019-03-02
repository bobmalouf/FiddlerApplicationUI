/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * People on a team and dates on the team
 */
export interface TeamMember {
  /**
   * Name of person on team
   */
  teamMemberName?: string;
  /**
   * ID of person on team
   */
  teamMemberID?: string;
  /**
   * Date person joins team
   */
  teamMemberStartDate?: string;
  /**
   * Date person leaves team
   */
  teamMemberEndDate?: string;
}
