#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/175dd28469b1ffc0975302abdfc14ab8afd4661723cc4f390f40eefe30282a3a/contract';
import startContract from '../../snapshots/175dd28469b1ffc0975302abdfc14ab8afd4661723cc4f390f40eefe30282a3a/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/5348cd12a4e69698ded68d1f9b2f5cd4b5d1ad6e2c0a8b41824775dd266b3520/contract';
import endContract from '../../snapshots/5348cd12a4e69698ded68d1f9b2f5cd4b5d1ad6e2c0a8b41824775dd266b3520/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropColumn({ schema: 'public', table: 'Category', column: 'name' }),
      this.addRequiredColumnToEmptyTable({
        schema: 'public',
        table: 'Category',
        column: 'title',
        type: 'text',
      }),
      this.addRequiredColumnToEmptyTable({
        schema: 'public',
        table: 'Product',
        column: 'categoryId',
        type: 'int4',
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'Category',
        constraint: 'Category_title_check_ced7c6a6',
        expression: sql`"title" IN ('ELECTRONICS', 'MOBILE_PHONES', 'COMPUTERS', 'COMPUTER_ACCESSORIES', 'HOME_APPLIANCES', 'CLOTHING', 'SHOES', 'BAGS', 'JEWELRY', 'WATCHES', 'BEAUTY', 'PERSONAL_CARE', 'HEALTH', 'BABY_PRODUCTS', 'TOYS', 'BOOKS', 'STATIONERY', 'OFFICE_SUPPLIES', 'HOME_AND_KITCHEN', 'FURNITURE', 'HOME_DECOR', 'GARDEN', 'TOOLS', 'SPORTS', 'OUTDOOR', 'AUTOMOTIVE', 'PET_SUPPLIES', 'GROCERIES', 'FOOD_AND_BEVERAGES', 'MUSICAL_INSTRUMENTS', 'VIDEO_GAMES', 'ARTS_AND_CRAFTS', 'OTHER')`,
      }),
      this.addUnique({
        schema: 'public',
        table: 'Category',
        constraint: 'Category_title_key',
        columns: ['title'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Product',
        index: 'Product_categoryId_idx_15c304f2',
        columns: ['categoryId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Product',
        foreignKey: {
          name: 'Product_categoryId_fkey',
          columns: ['categoryId'],
          references: { schema: 'public', table: 'Category', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
