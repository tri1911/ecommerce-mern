import { Crumb } from "../components/Shared/Breadcrumbs";
import { Category } from "../services/category.service";

const categoryToCrumbs = ({ name, ancestors }: Category) => {
  let crumbs: Crumb[] = [];
  crumbs =
    ancestors?.map(({ _id, name }) => ({
      label: name,
      href: `/categories/${_id}`,
    })) ?? [];
  return [...crumbs, { label: name }];
};

export default categoryToCrumbs;
