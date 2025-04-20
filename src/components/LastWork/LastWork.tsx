"use client"
import styles from "./last-work.module.scss";
import { PaginationItem, Pagination, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CategoryPageProps, WorksFilterProps, WorksPageProps } from "@/types/types";
import { useFetchCategory } from "@/api/categoryApi";
import { useFetchWorks } from "@/api/worksApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import Loading from "@/app/loading";



type Props = {
  homepage?: boolean;
};

const LastWork = (props: Props) => {
  const homepage = props.homepage
  const router = useRouter()
  const [hoveredWork, setHoveredWork] = useState <number | undefined>(undefined);
  const [worksFilter,setWorksFilter] = useState<WorksFilterProps>({
    PageIndex:1,
    PageSize:homepage ? 2 : 4
  })
  
  const {data:works ,  isLoading} = useFetchWorks(worksFilter)
   const {data:categories} = useFetchCategory()


   
   const totalPages = Math.ceil(works?.count / (works?.pageSize || 1));



  const handlePageChange = (_event:React.ChangeEvent<unknown>, page:number) => {
    setWorksFilter((prev)=> ({...prev, PageIndex: page}))
  };

  const handelFilterCategory = (id:number) => {
    setWorksFilter((prev) => ({ ...prev, CategoryId: id }));
  };
if(isLoading && !homepage) return <Loading/>

  return (
    <div className={styles["lastWork-container"]}>
      <div
        className={`${styles.header} ${
          !homepage ? styles["works-header"] : ""
        }`}
      >
        <h1>
          Last <span>Work</span>
        </h1>
        {homepage && (
          <button onClick={() => router.push("/last-works")}>View all</button>
        )}
      </div>

      {!homepage && (
        <div className={styles.categories}>
          {categories?.map((category:CategoryPageProps) => (
            <div className={styles.category} key={category.id}>
              <button
                onClick={() => handelFilterCategory(category.id)}
                className={
                  worksFilter.CategoryId === category.id ? styles.active : ""
                }
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
      )}
     { works?.items?.length > 0 ? (
        <div className={styles.items}>
          {works?.items?.map((work:WorksPageProps, index:number) => (
            <div key={work.id} className={styles.details}>
              {index % 2 === 0 ? (
                <>
                  <div
                    className={styles.image}
                    onMouseEnter={() => setHoveredWork(work.id)}
                    onMouseLeave={() => setHoveredWork(undefined)}
                  >
                    <Image src={work.attachment} alt={work.name} width={500} height={300} />
                    {hoveredWork === work.id && (
                      <div className={styles.buttonContainer}>
                        <button>
                          <a
                            href={work.projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Project
                          </a>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className={styles.desc}>
                    <h2>{work.name}</h2>
                    <p>{work.description}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.desc}>
                    <h2>{work.name}</h2>
                    <p>{work.description}</p>
                  </div>
                  <div
                    className={styles.image}
                    onMouseEnter={() => setHoveredWork(work.id)}
                    onMouseLeave={() => setHoveredWork(undefined)}
                  >
                                        <Image src={work.attachment} alt={work.name} width={500} height={300} />

                    {hoveredWork === work.id && (
                      <div className={styles.buttonContainer}>
                        <button>
                          <a
                            href={work.projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Project
                          </a>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className={styles["loading"]}>No Result Found</p>
      )}

      {totalPages > 1 && (
        <div className={styles["pagination-container"]}>
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={worksFilter?.PageIndex || 1}
              onChange={handlePageChange}
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                  sx={{
                    color: "var(--secondary-color)",
                    "&.Mui-selected": {
                      bgcolor: "var(--secondary-color)",
                      color: "black",
                    },
                    "&:hover": {
                      bgcolor: "#00e18b !important",
                    },
                  }}
                />
              )}
            />
          </Stack>
        </div>
      )}
    </div>
  );
};

export default LastWork;
